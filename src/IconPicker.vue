<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
	modelValue?: string
	value?: string
	placeholder?: string
	debounce?: number
	itemsPerPage?: number
	paginationText?: string
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Search icons...',
	debounce: 300,
	itemsPerPage: 20,
	paginationText: 'Page {0} of {1}',
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
	(e: 'onSelect', value: string): void
}>()

const searchQuery = ref('')
const iconsResult = ref<string[]>([])
const isLoading = ref(false)
const selectedIcon = ref(props?.value || props.modelValue)
const cache = ref<Record<string, string[]>>({})
let debounceTimeout: ReturnType<typeof setTimeout>

const currentPage = ref(1)
const totalItems = computed(() => iconsResult.value.length)
const totalPages = computed(() =>
	Math.ceil(totalItems.value / props.itemsPerPage)
)
const paginatedIcons = computed(() => {
	const start = (currentPage.value - 1) * props.itemsPerPage
	const end = start + props.itemsPerPage
	return iconsResult.value.slice(start, end)
})
const hasResults = computed(() => iconsResult.value.length > 0)
const formattedPaginationText = computed(() => {
	return props.paginationText
		.replace('{0}', String(currentPage.value))
		.replace('{1}', String(totalPages.value))
})

const handleIconSelect = (icon: string) => {
	selectedIcon.value = icon
	emit('update:modelValue', icon)
	emit('onSelect', icon)
}

const searchIcons = async () => {
	if (!searchQuery.value.trim()) {
		iconsResult.value = []
		return
	}

	if (cache.value[searchQuery.value]) {
		iconsResult.value = cache.value[searchQuery.value]
		currentPage.value = 1
		return
	}

	isLoading.value = true
	const response = await fetch(
		`https://api.iconify.design/search?query=${encodeURIComponent(
			searchQuery.value
		)}&limit=200`
	)
	const data = await response.json()
	iconsResult.value = data.icons || []
	cache.value[searchQuery.value] = iconsResult.value
	isLoading.value = false
	currentPage.value = 1
}

const goToPrevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--
	}
}

const goToNextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++
	}
}

const handleSearch = () => {
	clearTimeout(debounceTimeout)
	debounceTimeout = setTimeout(() => {
		searchIcons()
	}, props.debounce)
}

watch(
	() => props.modelValue,
	(newValue) => {
		if (newValue !== selectedIcon.value) {
			selectedIcon.value = newValue
		}
	}
)

onUnmounted(() => {
	clearTimeout(debounceTimeout)
})
</script>

<template>
	<div class="icon-picker">
		<form
			class="icon-picker__form"
			@submit.prevent="handleSearch"
			role="search">
			<div class="icon-picker__input-wrapper">
				<input
					v-model="searchQuery"
					type="text"
					:placeholder="placeholder"
					class="icon-picker__input"
					aria-label="Search icons"
					@input="handleSearch" />
				<button
					type="submit"
					class="icon-picker__search-btn"
					aria-label="Search"
					:disabled="isLoading">
					<Icon
						icon="fluent:search-20-filled"
						class="icon-picker__search-icon" />
				</button>
			</div>
		</form>

		<div class="icon-picker__content">
			<div
				v-if="isLoading"
				class="icon-picker__loading">
				<Icon icon="svg-spinners:270-ring" />
			</div>

			<div
				v-else-if="hasResults"
				class="icon-picker__grid">
				<button
					v-for="icon in paginatedIcons"
					:key="icon"
					class="icon-picker__icon-btn"
					:class="{
						'icon-picker__icon-btn--selected':
							icon === selectedIcon,
					}"
					:title="icon"
					@click="handleIconSelect(icon)"
					type="button">
					<Icon
						:icon="icon"
						class="icon-picker__icon" />
				</button>
			</div>

			<div
				v-if="hasResults && totalPages > 1"
				class="icon-picker__pagination">
				<button
					class="icon-picker__pagination-btn"
					:disabled="currentPage === 1"
					@click="goToPrevPage"
					type="button"
					aria-label="Previous page">
					<Icon icon="ep:arrow-left-bold" />
				</button>

				<div class="icon-picker__pagination-info">
					{{ formattedPaginationText }}
				</div>

				<button
					class="icon-picker__pagination-btn"
					:disabled="currentPage === totalPages"
					@click="goToNextPage"
					type="button"
					aria-label="Next page">
					<Icon icon="ep:arrow-right-bold" />
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.icon-picker {
	--iconPicker-text: #1a1a1a;
	--iconPicker-border: #e0e0e0;
	--iconPicker-primary: #0066cc;
	--iconPicker-primary-fg: #0052a3;
	--iconPicker-primary-hover: #0052a3;
	--iconPicker-radius: 0.375em;
	--iconPicker-gap: 0.25em;
	--iconPicker-input-height: 2.125em;
	--iconPicker-selected-bg: #e6f3ff;
	--iconPicker-font-base: 15.5px;
	--iconPicker-transition: all 0.2s ease;
}

.icon-picker {
	color: var(--iconPicker-text);
	font-size: var(--iconPicker-font-base);
}

.icon-picker__form {
	margin-bottom: 0.65em;
}

.icon-picker__input-wrapper {
	position: relative;
	display: flex;
	align-items: center;
}

.icon-picker__input {
	width: 100%;
	height: var(--iconPicker-input-height);
	padding: 0 2.5em 0 0.6em;
	border: 1px solid var(--iconPicker-border);
	border-radius: var(--iconPicker-radius);
	font-size: 0.875em;
	background: transparent;
	transition: var(--iconPicker-transition);
}

.icon-picker__input:focus {
	outline: none;
	border-color: var(--iconPicker-primary);
}

.icon-picker__search-btn {
	position: absolute;
	right: 0;
	background: none;
	border: none;
	cursor: pointer;
	height: 100%;
	width: 2.5em;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--iconPicker-primary);
	transition: var(--iconPicker-transition);
}

.icon-picker__search-btn svg {
	font-size: 1.2em;
}

.icon-picker__search-btn:hover {
	color: var(--iconPicker-primary-hover);
}

.icon-picker__search-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.icon-picker__content {
	min-height: 6.25em;
}

.icon-picker__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(2.4em, 1fr));
	gap: var(--iconPicker-gap);
}

.icon-picker__icon-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px;
	border: 1px solid var(--iconPicker-border);
	border-radius: var(--iconPicker-radius);
	background: transparent;
	cursor: pointer;
	transition: var(--iconPicker-transition);
}

.icon-picker__icon-btn:hover {
	background: var(--iconPicker-selected-bg);
	border-color: var(--iconPicker-primary);
}

.icon-picker__icon-btn--selected {
	background: var(--iconPicker-selected-bg);
	border-color: var(--iconPicker-primary);
}

.icon-picker__icon {
	font-size: 1.45em;
}

.icon-picker__loading,
.icon-picker__empty {
	text-align: center;
	padding: 0.7em;
	font-size: 1em;
}

.icon-picker__pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 0.9em;
	padding-top: 0.7em;
	border-top: 1px solid var(--iconPicker-border);
}

.icon-picker__pagination-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1.9em;
	height: 1.9em;
	border: 1px solid var(--iconPicker-border);
	border-radius: var(--iconPicker-radius);
	background: transparent;
	cursor: pointer;
	transition: var(--iconPicker-transition);
}

.icon-picker__pagination-btn:hover:not(:disabled) {
	background: var(--iconPicker-selected-bg);
	border-color: var(--iconPicker-primary);
}

.icon-picker__pagination-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.icon-picker__pagination-info {
	margin: 0 1em;
	font-size: 0.9em;
}
</style>
