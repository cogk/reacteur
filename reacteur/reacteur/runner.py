import json
from typing import TYPE_CHECKING
from dataclasses import dataclass, field

import frappe
from frappe.utils.safe_exec import safe_exec

if TYPE_CHECKING:
	from reacteur.reacteur.doctype.reacteur_block_instance.reacteur_block_instance import ReacteurBlockInstance
	from reacteur.reacteur.doctype.reacteur_block_type_slot.reacteur_block_type_slot import ReacteurBlockTypeSlot
	from reacteur.reacteur.doctype.reacteur_flow.reacteur_flow import ReacteurFlow
	from reacteur.reacteur.doctype.reacteur_block_type.reacteur_block_type import ReacteurBlockType


_UNSET = object()


@dataclass
class ActionFlowContext:
	globals: dict = field(default_factory=dict)
	results: dict = field(default_factory=dict)
	provides: dict = field(default_factory=dict)

	def has_result(self, block_id: str):
		return block_id in self.results

	def get_result(self, block_id: str):
		return self.results[block_id]

	def set_result(self, block_id: str, value):
		self.results[block_id] = value

	def provide(self, key: str, value):
		self.provides[key] = value

	def inject(self, key: str, dflt=_UNSET):
		val = self.provides.get(key, dflt)
		if val == _UNSET:
			raise KeyError(f"No such provide: {key!r}")
		return val

	def as_dict(self):
		return {**self.globals, "PROVIDE": self.provide, "INJECT": self.inject}


class FlowControl:
	class Abort(BaseException):
		def __init__(self, message: str):
			self.message = str(message)

	class Return(BaseException):
		def __init__(self, return_value):
			self.return_value = return_value

	@classmethod
	def abort(cls, *args, **kwargs):
		raise cls.Abort(*args, **kwargs)


@dataclass
class ActionFlowRunner:
	flow_doc: "ReacteurFlow"
	context: ActionFlowContext = field(default_factory=ActionFlowContext)
	plan: list[str] = field(default_factory=list)
	log_lines: list[str] = field(default_factory=list)

	def exec(self, code: str, globals_: dict, locals_: dict):
		if code.startswith("@") and "\n" not in code.strip():
			# Run a server-side function, allows a return value.
			return frappe.call(code[1:], **locals_)

		safe_exec(code, globals_, locals_)

	def log(self, *msg):
		self.log_lines.append(" ".join(map(repr, msg)))
		print(*msg)

	def get_block_type(self, name: str) -> "ReacteurBlockType":
		return frappe.get_doc("Reacteur Block Type", name)

	def get_code(self, block_type: "ReacteurBlockType", lang: str, kind: str) -> str | None:
		for row in block_type.scripts:
			if row.lang == lang and row.kind == kind:
				return row.code

	def get_slot(self, block_type: "ReacteurBlockType", slot_name: str) -> "ReacteurBlockTypeSlot":
		for slot in block_type.slots:
			if slot.slot_name == slot_name:
				return slot

	def run_block(self, block: "ReacteurBlockInstance | str", arguments: dict | None = None):
		if isinstance(block, str):
			block = self.get_block(block)
		if not block:
			raise Exception("no block found")

		block_id = block.name
		block_type = self.get_block_type(block.block_type)
		block_args = self.prepare_args(block, block_type)
		if arguments:
			block_args |= arguments

		code = self.get_code(block_type, "Python", "Execution")
		if not isinstance(code, str):
			raise Exception(f"{block.block_type}#{block_id}: no code")

		try:
			base_globals = {"BLOCK_ID": block_id, "flow": FlowControl}
			globals_ = self.context.as_dict() | base_globals
			res = self.exec(code, globals_, block_args)
			if res is not None:
				raise FlowControl.Return(res)
		except FlowControl.Return as e:
			self.context.set_result(block_id, e.return_value)
			self.log(f"{block.block_type}#{block_id} -> {e.return_value!r}")
			return e.return_value
		except FlowControl.Abort:
			raise
		except Exception as e:
			self.log(f"{block.block_type}#{block_id}: {e}", block_args)
			raise

	def get_block(self, block_id: str):
		for block in self.flow_doc.blocks:
			if block.get("name") == block_id:
				return block

	def prepare_args(self, block: "ReacteurBlockInstance", block_type: "ReacteurBlockType"):
		# Prepare arguments of a block before calling into. This involves resolving each slot of the block to its final value.
		args = {}
		raw_args = self.get_raw_args(block)

		for key, val in raw_args.items():
			# self.validate_slot_value(block_type, key, val)
			args[key] = self.resolve(val)

		return args

	def get_raw_args(self, block: "ReacteurBlockInstance"):
		raw_args = block.args
		if raw_args and isinstance(raw_args, str):
			raw_args = json.loads(raw_args)
		if not raw_args:
			return {}
		if not isinstance(raw_args, dict):
			raise TypeError("args should be a dict")
		return raw_args

	def resolve(self, val):
		# Resolve special values to their final shape (e.g. resolving a `{"ref": "..."}` argument to a callable).
		if isinstance(val, (list, tuple)):
			return type(val)(map(self.resolve, val))
		elif isinstance(val, dict):
			return self._resolve_dict(val)
		else:
			return val

	def _resolve_dict(self, val: dict):
		if "ref" in val:
			# Provide a callable function to execute the referenced block (possibly more than once).
			# Useful for architectural blocks such as a grouping block (group, if-else).
			ref_id = str(val["ref"])
			val = lambda **kwargs: self.run_block(ref_id, kwargs)  # noqa: E731
			val.__qualname__ = val.__name__ = f"block#{ref_id}"
			return val
		elif "result_of" in val:
			# Grab the result (returned value) of the referenced block.
			# If the ref'd block was not called beforehand, execute it first then return its result.
			ref_id = str(val["result_of"])
			if not self.context.has_result(ref_id):
				self.run_block(ref_id)  # Writes into self.context.results
			res = self.context.get_result(ref_id)
			# post-process: grab key, etc.
			return res
		elif "raw" in val:
			# Return the value of the `raw` key, bypassing any specific processing.
			# This is useful to provide arguments of any type and shape without the risk of
			# unintended interpretation (e.g. a dict with a `ref` key but not intended to be interpreted by `resolve`).
			return val["raw"]
		else:
			print(
				"warn: An argument was stored outside of a raw-dict. This might cause issues for arbitrary values. Please ensure that all your dicts are stored inside of a `{'raw': <your_dict>}` dict."
			)
			return val

	def validate_slot_value(self, block_type, key, val):
		slot = self.get_slot(block_type, key)
		if not slot:
			raise Exception(f"unexpected slot: {key}")
		else:
			if slot.get("preparation") == "callable_ref":
				if not (isinstance(val, dict) and val.get("ref")):
					if not (isinstance(val, (list, tuple))):
						raise Exception("callable_ref should be a ref", val, slot)

	def execute(self, block_id: str | None = None, args=None):
		if not block_id:
			block_id = self.flow_doc.blocks[0].name

		try:
			self.run_block(block_id, args)
		except FlowControl.Abort as e:
			print("Abort", e.message)


def run_flow(flow_doc: "ReacteurFlow", flow_input: dict | None = None):
	context = ActionFlowContext({ "FLOW_INPUT": flow_input })
	runner = ActionFlowRunner(flow_doc, context)
	runner.execute()
	return runner
