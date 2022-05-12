<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let hasPrev = true
	export let hasNext = true

	const dispatch = createEventDispatcher()

	function handlePrev() {
		dispatch('prev')
	}

	function handleNext() {
		dispatch('next')
	}
</script>

<div class="flex justify-center">
	<button
		type="button"
		on:click={handlePrev}
		class="text-gray-500 hover:text-indigo-500 px-2 disabled:opacity-50"
		disabled={!hasPrev}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
			/>
		</svg>
	</button>
	<button
		type="button"
		on:click={handleNext}
		class="text-gray-500 hover:text-indigo-500 px-2 disabled:opacity-50"
		disabled={!hasNext}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	</button>
</div>
