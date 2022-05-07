<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	import { loaded, users, getUsersAction } from '$lib/stores/users';

	onMount(() => {
		getUsersAction();
	});

	$: console.log($users);
	$: console.log($loaded);
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

{#if $loaded}
	<div class="space-y-4 w-2/5 mx-auto p-8">
		{#each $users as user, index}
			<div
				class="bg-gray-50 px-6 py-4 rounded-md shadow-lg flex items-center"
				transition:scale={{ duration: 200 * (index + 1) }}
			>
				<img src={user.avatar} alt={user.firstName} class="rounded-full w-16 h-16" />
				<div class="ml-6 flex flex-col">
					<h2 class="text-xl font-semibold text-indigo-600">{user.fullName}</h2>
					<a href={`mailto:${user.email}`} class="text-gray-600 hover:text-indigo-700 text-sm"
						>{user.email}</a
					>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="text-lg font-semibold text-center p-8">
		<span class="animate-pulse">Carregando...</span>
	</div>
{/if}
