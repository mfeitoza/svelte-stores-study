<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import UserCard from '$lib/components/user-card.svelte';

	import { usersStore, fetchUsers } from '$lib/stores/users-reatom';

	$: console.log($usersStore.users);

	onMount(() => {});
</script>

<svelte:head>
	<title>Reatom</title>
</svelte:head>
