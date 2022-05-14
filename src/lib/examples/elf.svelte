<script lang="ts">
	import { onMount, afterUpdate } from 'svelte'
	import { scale } from 'svelte/transition'
	import UserCard from '$lib/components/user-card.svelte'
	import Paginator from '$lib/components/paginator.svelte'

	import { dispatch } from '@ngneat/effects'

	import {
		users$,
		loaded$,
		hasPrev$,
		hasNext$,
		fetchUsers,
		fetchPrevAction,
		fetchNextAction
	} from '$lib/stores/users-elf'

	onMount(() => {
		return fetchUsers().subscribe()
	})

	afterUpdate(() => {
		console.log('afterUpdate elf')
	})
</script>

<svelte:head>
	<title>Elf</title>
</svelte:head>

{#if $loaded$}
	<div class="space-y-4 w-2/5 mx-auto p-8">
		{#each $users$ as user, index}
			<div in:scale={{ duration: 200 * (index + 1) }}>
				<UserCard fullName={user.fullName} email={user.email} avatar={user.avatar} />
			</div>
		{/each}
		<Paginator
			on:prev={() => dispatch(fetchPrevAction())}
			on:next={() => dispatch(fetchNextAction())}
			hasPrev={$hasPrev$}
			hasNext={$hasNext$}
		/>
	</div>
{:else}
	<div class="text-lg font-semibold text-center p-8">
		<span class="animate-pulse">Carregando...</span>
	</div>
{/if}
