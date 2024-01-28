import { ClassicPreset as Classic, NodeEditor } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { VuePlugin, Presets as VuePresets } from 'rete-vue-plugin';

const socket = new Classic.Socket("socket");

/**
 * @typedef {(node: Classic.Node, data: any, onChange: () => void) => void} BlockCtor
 * @typedef {{ id: string, blockType: string }} Block
 * @typedef {{ label: string, make: BlockCtor }} BlockType
 */

/** @returns {BlockType} */
function getBlockType(blockType) {
	switch (blockType) {
		case "core/text":
			return {
				label: "Text",
				make(node, data, onChange) {
					node.addControl("text1", new Classic.InputControl("Text", { initial: data.value, change: onChange }));
					node.addOutput("text1", new Classic.Output(socket, "Text", true));
				}
			}
		case "core/text_upper":
			return {
				label: "Text Upper",
				make(node, data, onChange) {
					node.addInput("text2", new Classic.Input(socket, "Text", false));
				}
			}
		default:
			throw new Error(`Unknown block type: ${blockType}`);
	}
}

function required(name) {
	throw new Error(`Missing required field: ${name}`);
}

class GenericNode extends Classic.Node {
	width = 180;
	height = 120;

	constructor(data, onChange) {
		const blockType = getBlockType(data.blockType ?? required("blockType")) ?? required(`No block type '${data.blockType}' found`);
		const label = blockType.label;
		super(label);
		this.id = data.id ?? required("id");
		blockType.make(this, data, onChange);
	}

	data() {
		const value = this.controls['value'].value;
		return { value };
	}
}


export async function createEditor(container) {
	const editor = new NodeEditor();
	const area = new AreaPlugin(container);
	const connection = new ConnectionPlugin();
	const vueRender = new VuePlugin();

	editor.use(area);
	area.use(connection);
	area.use(vueRender);

	connection.addPreset(ConnectionPresets.classic.setup());
	vueRender.addPreset(VuePresets.classic.setup());

	const nodes = [
		{
			id: 1,
			blockType: "core/text_upper",
		},
		{
			id: 2,
			blockType: "core/text",
		},
	]

	const onChange = () => {
		const nodes = editor.getNodes();
		const edges = editor.getConnections();
		const json = JSON.stringify({ nodes, edges }, null, 2);
		console.log(json);
	}
	const addNode = (node) => editor.addNode(new GenericNode(node, onChange));

	const nodeInstances = await Promise.all(nodes.map(addNode));

	return {
		editor,
		destroy: () => area.destroy(),
	};
}
