<script lang="ts">
	import { scale } from 'svelte/transition'

	import UserCard from '$lib/components/user-card.svelte'
	import Paginator from '$lib/components/paginator.svelte'
	import { state, actions } from '$lib/stores/overmind'
	import { onMount, afterUpdate } from 'svelte'

	afterUpdate(() => {
		console.log('afterUpdate overmind')
	})

	$: loaded = $state.loaded
	$: users = $state.users
</script>

{#if loaded}
	<div class="space-y-4 w-2/5 mx-auto p-8">
		{#each users as user, index}
			<div in:scale={{ duration: 200 * (index + 1) }}>
				<UserCard fullName={user.fullName} email={user.email} avatar={user.avatar} />
			</div>
		{/each}
		<Paginator
			on:prev={actions.getPrevUsers}
			on:next={actions.getNextUsers}
			hasPrev={$state.hasPrev}
			hasNext={$state.hasNext}
		/>
	</div>
{:else}
	<div class="text-lg font-semibold text-center p-8">
		<span class="animate-pulse">Carregando...</span>
	</div>
{/if}
