<script lang="ts">
	export let fullName: string;
	export let email: string;
	export let avatar: string;
</script>

<div class="bg-gray-50 px-6 py-4 rounded-md shadow-lg flex items-center">
	<img src={avatar} alt={fullName} class="rounded-full w-16 h-16" />
	<div class="ml-6 flex flex-col">
		<h2 class="text-xl font-semibold text-indigo-600">{fullName}</h2>
		<a href={`mailto:${email}`} class="text-gray-600 hover:text-indigo-700 text-sm">{email}</a>
	</div>
</div>
