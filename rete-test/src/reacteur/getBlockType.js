import { ClassicPreset as Classic } from "rete";
import { socket } from ".";

/**
 * @typedef {(node: Classic.Node, data: any, onChange: () => void) => void} BlockCtor
 * @typedef {{ id: string, blockType: string }} Block
 * @typedef {{ label: string, make: BlockCtor }} BlockType
 */
/** @returns {BlockType} */
export function getBlockType(blockType) {
	switch (blockType) {
		case "core/text":
			return {
				label: "Text",
				make(node, data, onChange) {
					node.addControl(
						"in:text",
						new Classic.InputControl("Text", { initial: data.value, change: onChange })
					);
					node.addOutput("out:text", new Classic.Output(socket, "Text", true));
				},
			};
		case "core/text_transform":
			return {
				label: "Text Transform",
				make(node, data, onChange) {
					node.addInput("in:text", new Classic.Input(socket, "Text", false));
					node.addOutput("out:text", new Classic.Input(socket, "Text", false));
				},
			};
		case "core/if-else":
			return {
				label: "Text Transform",
				make(node, data, onChange) {
					node.addInput("in:@flow", new Classic.Input(socket, "Text", false));
					node.addOutput("out:yes", new Classic.Input(socket, "Yes", false));
					node.addOutput("out:no", new Classic.Input(socket, "No", false));
				},
			};
		default:
			throw new Error(`Unknown block type: ${blockType}`);
	}
}
