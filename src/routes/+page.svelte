<script lang="ts">
	import { useSvelteTRPC } from '$lib/svelte-query';

	export let data;

	const trpc = useSvelteTRPC();
	const prefetchedMsg = data.prefetchedMsg();
	const goodbye = trpc.greet.goodbye.createQuery();
	const secret = trpc.greet.secret.createQuery();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>Prefetched Message: {$prefetchedMsg.data}</p>

{#if $goodbye.isPending}
	<p>Loading...</p>
{:else if $goodbye.data}
	<p>{$goodbye.data}</p>
{:else}
	<p>{$goodbye.error?.message}</p>
{/if}

{#if $secret.isPending}
	<p>Loading</p>
{:else if $secret.data}
	<p>{$secret.data}</p>
{:else}
	<p>{$secret.error?.message}</p>
{/if}
