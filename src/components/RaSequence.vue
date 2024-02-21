<script setup>
// @ts-check
import RaPort from "./RaPort.vue"
import RaBlock from "./RaBlock.vue"
import RaStack from "./RaStack.vue"
import RaMagicArrow from "./utils/RaMagicArrow.vue"
import RaPlusButton from "./buttons/RaPlusButton.vue"
import { Bb, showNewChildrenButton, canHaveChildren } from "../utils/nodeQueries.js"
import { getNode, getBasicBlock } from "../stores/graph.js"
import { selectSmart } from "../stores/selection.js"
import { computed } from "vue"

// @ts-ignore
import VueDraggable from "vuedraggable/dist/vuedraggable.common"

const props = defineProps({
	bb: {
		type: Bb,
		default: null,
	},
	id: {
		type: [String],
		default: "",
	},
})

const basicBlock = computed(() => {
	if (props.bb) {
		return props.bb
	} else {
		return getBasicBlock(props.id)
	}
})

const couldHaveChildren = computed(() => canHaveChildren(basicBlock.value.mainNode))
const showPlusButton = computed(() => showNewChildrenButton(basicBlock.value))

const getExitUid = (id) => `${id}.end`
const getEntranceUid = (id) => `${id}.start`

const sortedIds = computed({
	get: () => {
		return basicBlock.value.nodeIds.map((nodeId, idx) => ({ nodeId, idx })).slice(1)
	},
	set: (val) => {
		basicBlock.value.reorder(val.map((x) => x.nodeId))
	},
})

function onClick(event) {
	if (!event.target.closest(".ra-block")) {
		selectSmart(event, basicBlock.value.mainNode.id)
	}
}
</script>

<template>
	<RaStack class="ra-clickable" :label="basicBlock.label" @click="onClick">
		<RaPort :uid="getEntranceUid(basicBlock.id)" shape="square" type="empty" v-if="basicBlock.entrances.length > 0" />

		<div class="ra-stack-row" :data-index="0">
			<RaBlock :id="basicBlock.nodeIds[0]" />
			<RaPlusButton v-if="showPlusButton" :after-id="basicBlock.nodeIds[0]" :inside-id="basicBlock.id" />
		</div>

		<VueDraggable
			v-if="couldHaveChildren"
			class="ra-stack__blocks"
			group="blocks"
			v-model="sortedIds"
			item-key="nodeId"
		>
			<template #item="{ element }">
				<div class="ra-stack-row ra-draggable-block" :data-index="element.idx">
					<RaBlock :id="element.nodeId" />
					<RaPlusButton v-if="showPlusButton" :after-id="element.nodeId" :inside-id="basicBlock.id" />
				</div>
			</template>
		</VueDraggable>

		<RaPort :uid="getExitUid(basicBlock.id)" shape="circle" type="filled" label="" v-if="basicBlock.exits.length > 0" />

		<template v-for="exit in basicBlock.exits">
			<RaMagicArrow :uid1="getExitUid(exit.from)" :uid2="getEntranceUid(exit.to)" :label="getNode(exit.to).label" />
		</template>
	</RaStack>
</template>

<style>
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: scale(0.9);
}

.ra-stack__blocks,
.ra-stack-row {
	display: flex;
	flex-direction: inherit;
	gap: inherit;
}

.ra-stack-row.ra-draggable-block {
	cursor: grab;
}
</style>
