import { ClassicPreset as Classic } from "rete";
import { getBlockType } from "./getBlockType";

function required(name) {
	throw new Error(`Missing required field: ${name}`);
}
export class GenericNode extends Classic.Node {
	width = 180;
	height = 120;

	constructor(data, onChange) {
		const blockType = getBlockType(data.type ?? required("type")) ??
			required(`No block type '${data.type}' found`);
		const label = blockType.label;
		super(label);
		this.id = data.id ?? required("id");
		blockType.make(this, data, onChange);
		this.type = data.type;
	}
	get isReacteur() {
		return true;
	}
}
