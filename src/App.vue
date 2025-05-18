<script setup lang="ts">
import IconPicker from './IconPicker.vue'
import { ref } from 'vue'

const icon = ref('')
</script>

<template>
	<div>
		<IconPicker v-model="icon" />
	</div>
</template>

<style>
div {
	max-width: 200px;
}
</style>
