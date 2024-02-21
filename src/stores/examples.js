export const EXAMPLE_1 = [
	{
		id: "0",
		label: "trigger",
		type: "Trigger",
		args: [{ key: "on_trigger", type: "jump", value: "10" }],
		// exposes: [{ key: "document", type: "raw" }],
	},
	{
		id: "10",
		label: "(main)",
		type: "Sequence",
		args: [
			{ key: "sequence_element", type: "jump", value: "11" },
			{ key: "sequence_element", type: "jump", value: "12" },
		],
	},
	{ id: "11", label: "get x", type: "_placeholder", args: [] },
	{
		id: "12",
		label: "if x >= 0",
		type: "Switch",
		args: [
			{ key: "condition_cast", type: "raw", value: "bool" },
			{ key: "case", type: "jump", value: "20", data: { case: true } },
			{ key: "case", type: "jump", value: "30", data: { case: false } },
		],
	},
	{
		id: "20",
		label: "(yes)",
		type: "Sequence",
		args: [{ key: "sequence_element", type: "jump", value: "21" }],
	},
	{ id: "21", label: "positive", type: "_placeholder", args: [] },
	{
		id: "30",
		label: "(no)",
		type: "Sequence",
		args: [
			{ key: "sequence_element", type: "jump", value: "31" },
			{ key: "sequence_element", type: "jump", value: "32" },
		],
	},
	{ id: "31", label: "negative", type: "_placeholder", args: [] },
	{
		id: "32",
		label: "qsdf",
		type: "Jump",
		args: [],
		// args: [{ key: "case", type: "jump", value: "30", data: { case: false } }],
	},
]

export const EXAMPLE_2 = [
	{
		id: "0",
		label: "Trigger: on Webform submission",
		type: "Trigger",
		args: [
			{ key: "on_trigger", type: "jump", value: "10" },
			{ key: "webform_name", type: "text", value: "My Webform" },
		],
	},
	{
		id: "10",
		label: "",
		type: "Sequence",
		args: [
			{ key: "sequence_element", type: "jump", value: "11" },
			{ key: "sequence_element", type: "jump", value: "12" },
			// { key: "sequence_element", type: "jump", value: "13" },
		],
	},
	{
		id: "11",
		label: "Create a document (User)",
		type: "_placeholder",
		args: [
			{ key: "reference_doctype", type: "text", value: "User" },
			{ key: "field_mapping", type: "text", value: "My Field Mapping #1 (WF1->User)" },
			{ key: "field:create_user_immediately", type: "check", value: "yes" },
		],
	},
	{
		id: "12",
		label: "Update a document (Contact)",
		type: "_placeholder",
		args: [
			{ key: "reference_doctype", type: "text", value: "Contact" },
			{ key: "field_mapping", type: "text", value: "" },
			{ key: "field:is_internal_contact", type: "subflow", value: "20" },
		],
	},
	{
		id: "20",
		label: "",
		type: "Sequence",
		args: [{ key: "sequence_element", type: "jump", value: "21" }],
	},
	{
		id: "21",
		label: "random() > 0.5",
		type: "_placeholder",
		args: [{ key: "expression", type: "code", value: "random() > 0.5" }],
	},
]
