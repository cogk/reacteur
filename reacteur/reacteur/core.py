from frappe.utils.safe_exec import safe_eval


def do_eval(expr: str):
	"""Evaluate an expression in the context of the current document."""
	return safe_eval(expr)
