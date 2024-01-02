# Copyright (c) 2024, Dokos SAS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ReacteurBlockType(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from reacteur.reacteur.doctype.reacteur_block_type_code.reacteur_block_type_code import ReacteurBlockTypeCode
		from reacteur.reacteur.doctype.reacteur_block_type_slot.reacteur_block_type_slot import ReacteurBlockTypeSlot

		identifier: DF.Data | None
		is_standard: DF.Check
		module: DF.Link | None
		scripts: DF.Table[ReacteurBlockTypeCode]
		slots: DF.Table[ReacteurBlockTypeSlot]
		tags: DF.Data | None
		version: DF.Data | None
	# end: auto-generated types

	def on_update(self):
		if frappe.conf.developer_mode and self.is_standard:
			import os
			from frappe import scrub
			from frappe.modules import get_module_path
			from frappe.modules.export_file import get_custom_module_path

			if frappe.db.get_value("Module Def", self.module, "custom"):
				module_path = get_custom_module_path(self.module)
			else:
				module_path = get_module_path(self.module)

			dn = scrub(self.identifier).replace("/", "_")

			# create folder
			folder = os.path.join(module_path, scrub(self.doctype), dn)
			frappe.create_folder(folder)

			path = os.path.join(folder, f"{dn}.json")
			with open(path, "w+") as txtfile:
				txtfile.write(frappe.as_json(self.as_dict(no_nulls=True)))
			print(f"Wrote document file for {self.doctype} {self.name} at {path}")
