<script lang="ts" context="module">
	const SVELTE_QUERY_CTX = 'svelte-query-ctx';

	export function useSvelteTRPC() {
		const client = getContext<ReturnType<typeof trpc>>(SVELTE_QUERY_CTX);
		if (!client) throw new Error('useSvelteQuery must be used within a SvelteQueryProvider');
		return client;
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { getContext, setContext } from 'svelte';
	import { SvelteQueryConfig } from '.';

	export let queryClient: QueryClient = new QueryClient(SvelteQueryConfig);
	export let trpcClient: ReturnType<typeof trpc> = trpc($page, queryClient);
	setContext(SVELTE_QUERY_CTX, trpcClient);
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
