import { ClassicPreset as Classic, NodeEditor } from "rete";
import { AreaPlugin } from "rete-area-plugin";
import { ConnectionPlugin, Presets as ConnectionPresets } from "rete-connection-plugin";
import { VuePlugin, Presets as VuePresets } from "rete-vue-plugin";
import { GenericNode } from "./GenericNode";

import ReacteurNode from "./ReacteurNode.vue";
import ReacteurEdge from "./ReacteurEdge.vue";
import ReacteurSocket from "./ReacteurSocket.vue";

export const socket = new Classic.Socket("socket");

export async function createEditor(container) {
	const editor = new NodeEditor();
	const area = new AreaPlugin(container);
	const connection = new ConnectionPlugin();
	const vueRender = new VuePlugin();

	window.z = { editor, area, connection, vueRender };

	editor.use(area);
	area.use(connection);
	area.use(vueRender);

	connection.addPreset(ConnectionPresets.classic.setup());

  vueRender.addPreset(
    VuePresets.classic.setup({
      customize: {
        // node(context) {
				// 	return ReacteurNode;
        // },
        // socket(context) {
        //   return ReacteurSocket;
        // },
        connection(context) {
          return ReacteurEdge;
        },
      },
    })
  );

	const stored = [
		{
			id: 1,
			type: "core/text",
		},
		{
			id: 2,
			type: "core/text_transform",
			args: [
				["text", { t: "result_of", result_of: 1, key: "text" }],
			],
		},
		{
			id: 3,
			type: "core/text_transform",
			args: [
				["text", { t: "result_of", result_of: 2, key: "text" }],
				["text", { t: "callable_ref", callable_ref: 2 }],
			],
		},
	];

	const nodes = [];
	const edges = [];

	for (const block of stored) {
		nodes.push({
			id: block.id,
			type: block.type,
		});
		if (block.args) {
			for (const [key, edge] of block.args) {
				if (edge.t === "result_of") {
					edges.push({
						source: edge.result_of,
						sourceOutput: edge.key,
						target: block.id,
						targetInput: key,
					});
				} else if (edge.t === "callable_ref") {
					edges.push({
						source: edge.callable_ref,
						sourceOutput: key,
						target: block.id,
						targetInput: "@flow",
					});
				}
			}
		}
	}

	const onChange = () => {
		const nodes = editor.getNodes();
		const edges = editor.getConnections();
		console.log(nodes, edges)

		const mapp = {};
		const out = [];
		for (const node of nodes) {
			const exportedNode = {
				id: node.id,
				type: node.type,
				args: [],
				position: area.nodeViews.get(node.id).position,
			};
			out.push(exportedNode);
			mapp[exportedNode.id] = exportedNode;
		}
		for (const edge of edges) {
			const source = mapp[edge.source];
			const target = mapp[edge.target];
			if (!source || !target) {
				console.warn("Missing node", source, target);
				continue;
			}
			source.args.push([edge.sourceOutput, { t: "result_of", result_of: target.id, key: edge.targetInput }]);
		}

		console.log(out)
		// const json = JSON.stringify(out, null, 2);
		// console.log(json);
	};
	const addNode = (node) => editor.addNode(new GenericNode(node, onChange));

	const nodeInstances = await Promise.all(nodes.map(addNode));

	return {
		editor,
		destroy: () => area.destroy(),
	};
}
