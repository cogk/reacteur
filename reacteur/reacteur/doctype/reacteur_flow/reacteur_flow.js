// Copyright (c) 2024, Dokos SAS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Reacteur Flow", {
	refresh(frm) {
		frm.page.add_action_item(__("Execute"), () => {
			frm.call("execute").then(() => {
				frm.reload_doc();
			});
		});
	},
});
