// @ts-check
import { computed, ref } from "vue"
import { defineStore } from "pinia"

export const useSelectionStore = defineStore("selection", () => {
	const selection = ref(new Set([]))

	function selectReplace(id) {
		selection.value.clear()
		selection.value.add(id)
	}

	function selectPush(id) {
		selection.value.add(id)
	}

	function selectClear() {
		selection.value.clear()
	}

	/**
	 * @param {MouseEvent} event
	 * @param {string} id
	 */
	function selectSmart(event, id) {
		if (event.shiftKey) {
			selectPush(id)
		} else {
			selectReplace(id)
		}
	}

	const isSelected = (/** @type {string} */ id) => selection.value.has(id)

	return {
		selection,
		selectReplace,
		selectPush,
		selectClear,
		selectSmart,
		isSelected,
	}
})

export const selectSmart = (event, id) => useSelectionStore().selectSmart(event, id)
