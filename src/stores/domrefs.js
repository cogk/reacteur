import { ref } from "vue"
import { defineStore } from "pinia"

export const useDomRefsStore = defineStore("domRefs", () => {
	/** @type {import('vue').Ref<Record<string, HTMLElement>>} */
	const refs = ref({})

	return {
		refs,
		getRef: (name) => refs.value[String(name)],
		setRef: (name, el) => {
			refs.value[String(name)] = el
		},
		deleteRef: (name) => {
			delete refs.value[String(name)]
		},
	}
})
