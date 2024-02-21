<script setup>
import {
	ReaderIcon,
	InputIcon,
	IdCardIcon,
	CodeIcon,
	QuestionMarkIcon,
	OpenInNewWindowIcon,
	ShuffleIcon,
	LightningBoltIcon,
	EnterFullScreenIcon,
	RocketIcon,
	CheckboxIcon,
} from "@radix-icons/vue"

const props = defineProps({
	type: {
		type: String,
		default: "",
	},
})
</script>

<template>
	<QuestionMarkIcon v-if="!type" />
	<IdCardIcon v-else-if="type == '@id'" />
	<InputIcon v-else-if="type == '@label'" />
	<ReaderIcon v-else-if="type == 'text'" />
	<CheckboxIcon v-else-if="type == 'check'" />
	<CodeIcon v-else-if="type == 'raw'" />
	<OpenInNewWindowIcon v-else-if="type == 'jump'" />
	<RocketIcon v-else-if="type == 'subflow'" />
	<CodeIcon v-else-if="type == 'code'" />

	<LightningBoltIcon v-else-if="type == 'Trigger'" />
	<ShuffleIcon v-else-if="type == 'Switch'" />
	<OpenInNewWindowIcon v-else-if="type == 'Jump'" />

	<EnterFullScreenIcon v-else-if="type == '_placeholder'" />

	<span v-else>
		<QuestionMarkIcon />
		<span>
			no icon for <b>{{ type }}</b>
		</span>
	</span>
</template>
