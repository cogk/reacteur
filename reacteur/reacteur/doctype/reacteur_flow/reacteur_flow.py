# Copyright (c) 2024, Dokos SAS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ReacteurFlow(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from reacteur.reacteur.doctype.reacteur_block_instance.reacteur_block_instance import ReacteurBlockInstance
		from reacteur.reacteur.doctype.reacteur_synthesized_trigger.reacteur_synthesized_trigger import ReacteurSynthesizedTrigger

		blocks: DF.Table[ReacteurBlockInstance]
		synthesized_triggers: DF.Table[ReacteurSynthesizedTrigger]
		title: DF.Data | None
	# end: auto-generated types

	@frappe.whitelist()
	def execute(self, trigger_id: str | None = None):
		from reacteur.reacteur.runner import run_flow

		res = run_flow(self, { "trigger_id": trigger_id or "any" })
		frappe.msgprint(res.log_lines, as_list=True)
