/**
 * @param {Bb} bb
 */
export function showNewChildrenButton(bb) {
	return bb.mainNode.type === "Sequence"
}

/**
 * @param {RaNode} node
 */
export function* getChildrenOfSequence(node) {
	for (const arg of node.args) {
		if (arg.key === "sequence_element" && arg.value) {
			yield arg.value
		}
	}
}

/**
 * @param {RaNode} node
 * @returns {Generator<string, void, void>}
 */
export function* getChildrenOfNode(node) {
	// Only sequences have children
	if (node.type === "Sequence") {
		yield* getChildrenOfSequence(node)
	}
}

/**
 * @param {RaNode} node
 * @returns {boolean}
 */
export function canHaveChildren(node) {
	if (node.type === "Sequence") {
		return true
	}
	return false
}

/**
 * @param {RaNode} node
 */
export function* getConditionalJumps(node) {
	if (node.type === "Switch") {
		if (node.args && Array.isArray(node.args)) {
			for (const arg of node.args) {
				if (arg.type === "jump") {
					yield { from: node.id, to: arg.value, arg }
				}
			}
		}
	}
}

/**
 * @param {RaNode} node
 */
export function* getJumps(node) {
	if (node.args && Array.isArray(node.args)) {
		for (const arg of node.args) {
			if (arg.type === "jump") {
				yield { from: node.id, to: arg.value, arg, node }
			}
		}
	}
}

/**
 * @template T
 * @param {T[]} iterable
 * @returns {Generator<[number, T], void, void>}
 */
export function* enumerate(iterable) {
	let i = 0
	for (const item of iterable) {
		yield [i, item]
		i += 1
	}
}

/**
 * @param {RaNode} node
 * @param {RaNode["id"][]} [knownChildren]
 */
export function* getExits(node, knownChildren) {
	for (const jmp of getJumps(node)) {
		if (knownChildren && knownChildren.includes(jmp.to)) {
			continue
		}
		yield new BbExit(jmp.from, jmp.to, node.id)
	}
}

export function doAssert(cond, msg = "doAssert") {
	if (!cond) {
		throw new Error(msg)
	}
}

class BbExit {
	/**
	 * @param {RaNode["id"]} from
	 * @param {RaNode["id"]} to
	 * @param {RaNode["id"]} via
	 */
	constructor(from, to, via) {
		this.from = String(from)
		this.to = String(to)
		this.via = String(via)
	}
}

export class Bb {
	/**
	 * @param {RaNode} mainNode
	 * @param {RaNode["id"][]} nodeIds
	 * @param {BbExit[]} [exits]
	 * @param {BbExit[]} [entrances]
	 */
	constructor(mainNode, nodeIds, exits = [], entrances = []) {
		this.mainNode = mainNode
		this.nodeIds = nodeIds
		this.exits = exits
		this.entrances = entrances
		this.label = ""
		this.depth = -1
	}

	get id() {
		return this.mainNode.id
	}

	reorder(newOrder, key = "sequence_element") {
		if (this.mainNode.type !== "Sequence") {
			return
		}
		const newArgs = newOrder.filter((id) => this.mainNode.id !== id).map((id) => ({ key, type: "jump", value: id }))
		const oldArgs = this.mainNode.args.filter((arg) => arg.key !== key)
		this.mainNode.args = [...newArgs, ...oldArgs]
		console.log("reorder", this.mainNode.args)
	}
}

/**
 * @param {RaNode[]} nodes
 */
export function* buildBasicBlocks(nodes) {
	/** @type {Map<RaNode["id"], Bb>} */
	const bbs = new Map()

	/** @type {Map<RaNode["id"], RaNode["id"]>} */
	const idToParentIdMap = new Map()

	for (const [i, node] of enumerate(nodes)) {
		/** @type {RaNode["id"][]} */
		const children = Array.from(getChildrenOfNode(node))

		// Insert the node itself into the children
		// if (children.length === 0 || children[0] !== node.id) {
		children.unshift(node.id)
		// }

		if (i === 0 || canHaveChildren(node)) {
			const bb = new Bb(node, children, [])
			bb.label = node.label
			bbs.set(node.id, bb)
		}

		const parentId = idToParentIdMap.get(node.id) ?? node.id
		for (const id of children) {
			idToParentIdMap.set(id, parentId)
		}

		// Add my exits to my parent
		const parent = bbs.get(parentId)
		for (const exit of getExits(node, children)) {
			exit.from = parentId // Rewrite the `from` to be the BB's id
			parent.exits.push(exit)
		}
	}

	// Add all exits as entrances to the target bb
	for (const bb of bbs.values()) {
		for (const exit of bb.exits) {
			const target = bbs.get(exit.to)
			if (!target) {
				console.warn(`No target for exit: ${exit.to}`, exit)
			}
			target.entrances.push(exit)
		}
	}

	// Compute depths for each bb
	/** @param {Bb} bb */
	function getDepth(bb) {
		if (bb.depth >= 0) {
			return bb.depth
		}
		bb.depth = -2

		const previousDepths = bb.entrances.map((entrance) => {
			const source = bbs.get(entrance.from)
			doAssert(source, `No source for entrance: ${entrance.from}`)
			if (source.depth == -2) {
				return -1
			}
			return getDepth(source)
		})

		if (previousDepths.length === 0) {
			bb.depth = 0
			return bb.depth
		}

		const max = Math.max(...previousDepths)
		bb.depth = max + 1
		return bb.depth
	}

	for (const bb of bbs.values()) {
		bb.depth = getDepth(bb)
	}

	for (const bb of bbs.values()) {
		yield bb
	}
}
