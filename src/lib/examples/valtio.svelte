<script lang="ts">
	import { onMount, afterUpdate } from 'svelte'
	import { scale } from 'svelte/transition'

	import UserCard from '$lib/components/user-card.svelte'
	import Paginator from '$lib/components/paginator.svelte'

	import { usersStore, pageStore, fetchUsers, fetchPrev, fetchNext } from '$lib/stores/users-valtio'
	import { page } from '$app/stores'

	function handlePrev() {
		fetchPrev()
	}

	function handleNext() {
		fetchNext()
	}

	onMount(() => {
		fetchUsers()
	})

	afterUpdate(() => {
		console.log('afterUpdate valtio')
	})
</script>

<svelte:head>
	<title>Valtio</title>
</svelte:head>

{#if $usersStore.loaded}
	<div class="space-y-4 w-2/5 mx-auto p-8">
		{#each $usersStore.users as user, index}
			<div in:scale={{ duration: 200 * (index + 1) }}>
				<UserCard fullName={user.fullName} email={user.email} avatar={user.avatar} />
			</div>
		{/each}
		<Paginator
			on:prev={handlePrev}
			on:next={handleNext}
			hasPrev={$pageStore.hasPrev}
			hasNext={$pageStore.hasNext}
		/>
	</div>
{:else}
	<div class="text-lg font-semibold text-center p-8">
		<span class="animate-pulse">Carregando...</span>
	</div>
{/if}
