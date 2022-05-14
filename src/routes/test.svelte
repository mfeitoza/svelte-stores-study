<script lang="ts">
	import Zustand from '$lib/examples/zustand.svelte'
	import Valtio from '$lib/examples/valtio.svelte'
	import Nano from '$lib/examples/nanostore.svelte'
</script>

<svelte:head>
	<title>teset</title>
</svelte:head>

<div class="flex space-x-8">
	<Zustand />
	<Valtio />
	<Nano />
</div>
