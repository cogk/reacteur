// @ts-check
import { computed } from "vue"
import { useGraphStore } from "../stores/graph.js"
import { Bb } from "../utils/nodeQueries.js"

export function useLayout() {
	const graphStore = useGraphStore()
	return computed(() => {
		return layout(graphStore.basicBlocks, graphStore.viewFilter)
	})
}

/**
 * @param {Bb[]} basicBlocks
 */
function layout(basicBlocks, filter) {
	/** @type {Bb[][]} */
	const rows = []

	for (const bb of basicBlocks) {
		if (bb.entrances.length === 0 && bb.exits.length === 0) {
			if (!filter.includes(bb.id)) {
				continue
			}
		}
		if (rows[bb.depth] === undefined) {
			rows[bb.depth] = [bb]
		} else {
			rows[bb.depth].push(bb)
		}
	}

	return rows
}
