# Copyright (c) 2024, Dokos SAS and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class ReacteurSynthesizedTrigger(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		next_trigger_time: DF.Datetime | None
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		reference_doctype: DF.Link | None
		trigger_key: DF.Data | None
		trigger_name: DF.Data | None
	# end: auto-generated types

	pass
