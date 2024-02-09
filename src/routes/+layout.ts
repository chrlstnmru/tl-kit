import { SvelteQueryConfig } from '$lib/svelte-query';
import { trpc } from '$lib/trpc/client';
import { QueryClient } from '@tanstack/svelte-query';

export async function load(event) {
	const queryClient = new QueryClient(SvelteQueryConfig);
	const trpcClient = trpc(event, queryClient);

	return { queryClient, trpcClient };
}
