<script lang="ts">
	import { scale } from 'svelte/transition';

	import { loaded, users } from '$lib/stores/users-nanostore';
	import UserCard from '$lib/components/user-card.svelte';
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

{#if $loaded}
	<div class="space-y-4 w-2/5 mx-auto p-8">
		{#each $users as user, index}
			<div transition:scale={{ duration: 200 * (index + 1) }}>
				<UserCard fullName={user.fullName} email={user.email} avatar={user.avatar} />
			</div>
		{/each}
	</div>
{:else}
	<div class="text-lg font-semibold text-center p-8">
		<span class="animate-pulse">Carregando...</span>
	</div>
{/if}
