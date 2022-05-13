<script lang="ts">
	import { scale } from 'svelte/transition'

	import {
		loaded,
		users,
		hasPrev,
		hasNext,
		fetchNext,
		fetchPrev
	} from '$lib/stores/users-nanostore'
	import UserCard from '$lib/components/user-card.svelte'
	import Paginator from '$lib/components/paginator.svelte'
	import { afterUpdate } from 'svelte'

	function handlePrev() {
		fetchPrev()
	}

	function handleNext() {
		fetchNext()
	}

	afterUpdate(() => {
		console.log('afterUpdate nanostore')
	})
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

{#if $loaded}
	<div class="space-y-4 w-2/5 mx-auto p-8">
		{#each $users as user, index}
			<div in:scale={{ duration: 200 * (index + 1) }}>
				<UserCard fullName={user.fullName} email={user.email} avatar={user.avatar} />
			</div>
		{/each}
		<Paginator on:prev={handlePrev} on:next={handleNext} hasPrev={$hasPrev} hasNext={$hasNext} />
	</div>
{:else}
	<div class="text-lg font-semibold text-center p-8">
		<span class="animate-pulse">Carregando...</span>
	</div>
{/if}
