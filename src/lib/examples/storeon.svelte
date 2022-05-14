<script lang="ts">
	import { onMount, afterUpdate } from 'svelte'
	import { scale } from 'svelte/transition'

	import UserCard from '$lib/components/user-card.svelte'

	import { provideStoreon } from '@storeon/svelte'
	import { useStoreon } from '@storeon/svelte'

	import { usersStore, type UsersState, type UsersEvent } from '$lib/stores/users-storeon'

	provideStoreon(usersStore)
	const { users, loaded, dispatch } = useStoreon<UsersState, UsersEvent>('users', 'loaded')

	onMount(() => {
		dispatch('fetchUsers')
	})

	afterUpdate(() => {
		console.log('afterUpdate storeon')
	})
</script>

<svelte:head>
	<title>Storeon</title>
</svelte:head>

{#if $loaded}
	<div class="space-y-4 w-2/5 mx-auto p-8">
		{#each $users as user, index}
			<div in:scale={{ duration: 200 * (index + 1) }}>
				<UserCard fullName={user.fullName} email={user.email} avatar={user.avatar} />
			</div>
		{/each}
	</div>
{:else}
	<div class="text-lg font-semibold text-center p-8">
		<span class="animate-pulse">Carregando...</span>
	</div>
{/if}
