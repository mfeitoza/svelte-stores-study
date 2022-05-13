<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import UserCard from '$lib/components/user-card.svelte';

	import { usersStore } from '$lib/stores/users-zustand';

	onMount(() => {
		$usersStore.fetch();
	});
</script>

<svelte:head>
	<title>Zustand</title>
</svelte:head>

{#if $usersStore.loaded}
	<div class="space-y-4 w-2/5 mx-auto p-8">
		{#each $usersStore.users as user, index}
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
