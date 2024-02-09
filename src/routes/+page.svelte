<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	let greeting = 'press the button to load data';
	let loading = false;

	const loadData = async () => {
		loading = true;
		greeting = await trpc($page).greet.hello.query();
		loading = false;
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<br />

{#if loading}
	<p>Loading...</p>
{:else}
	<p>{greeting}</p>
{/if}
<button on:click={loadData}>Load Data</button>
