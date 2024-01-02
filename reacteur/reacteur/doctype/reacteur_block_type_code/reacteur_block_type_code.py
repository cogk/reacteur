# Copyright (c) 2024, Dokos SAS and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class ReacteurBlockTypeCode(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		code: DF.Code | None
		kind: DF.Literal["Execution", "Validation"]
		lang: DF.Literal["Python", "JavaScript"]
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
	# end: auto-generated types

	pass
