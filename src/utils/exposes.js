export async function exposes(block) {
	console.log("exposes", block)
	return [
		{
			type: "number",
			label: "Number",
		},
	]
}
