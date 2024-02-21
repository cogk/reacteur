// @ts-check

import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { EXAMPLE_2 } from "./examples.js"
import { getExits, buildBasicBlocks, doAssert } from "../utils/nodeQueries.js"

/**
 * @typedef {object} RaNode
 * @property {string} id
 * @property {string} label
 * @property {string} type
 * @property {{ key: string, type: string, value?: any, data?: any }[]} args
 */

export const useGraphStore = defineStore("graph", () => {
	// https://news.ycombinator.com/item?id=24872752

	/** @type {RaNode[]} */
	const initialTree = EXAMPLE_2
	const nodes = ref(initialTree)
	const viewFilter = ref([])

	for (const node of nodes.value) {
		node.id = String(node.id)
	}

	const filteredNodes = computed(() => {
		if (viewFilter.value.length === 0) {
			return nodes.value
		}
		const deps = new Set()
		for (const id of viewFilter.value) {
			const node = getNode(id)
			if (node) {
				deps.add(id)
				for (const exit of getExits(node)) {
					deps.add(exit.via)
					deps.add(exit.to)
				}
			}
		}
		console.log("deps", deps)
		return nodes.value.filter((node) => deps.has(node.id))
	})

	const basicBlocks = computed(() => {
		return Array.from(buildBasicBlocks(filteredNodes.value))
	})

	/**
	 * @param {string} id
	 */
	function getNode(id) {
		return nodes.value.find((node) => node.id === id)
	}

	/**
	 * @param {RaNode} node
	 * @param {object} where
	 * @param {RaNode["id"]} where.inside
	 * @param {RaNode["id"]} where.after
	 */
	function addNode(node, where) {
		nodes.value.push(node)

		const parent = getNode(where.inside)
		doAssert(parent, `Node ${where.inside} not found (arg: inside)`)

		const seq = { key: "sequence_element", type: "jump", value: node.id }
		if (where.after === where.inside) {
			parent.args.splice(0, 0, seq)
		} else {
			const index = parent.args.findIndex((arg) => arg.value === where.after)
			doAssert(index >= 0, `Node ${where.after} not found (arg: after)`)
			parent.args.splice(index + 1, 0, seq)
		}
	}

	return {
		nodes,
		basicBlocks,
		getNode,
		addNode,
		viewFilter,
	}
})

export const getNode = (/** @type {string} */ id) => useGraphStore().getNode(id)
export const getBasicBlock = (/** @type {string} */ id) => {
	for (const bb of useGraphStore().basicBlocks) {
		if (bb.id === id) {
			return bb
		}
	}
}
