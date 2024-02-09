import { type TRPCClientInit, createTRPCClient } from 'trpc-sveltekit';
import type { TRPCRouter } from './router';
import type { QueryClient } from '@tanstack/svelte-query';
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';

let browserClient: ReturnType<typeof svelteQueryWrapper<TRPCRouter>>;

export function trpc(init?: TRPCClientInit, queryClient?: QueryClient) {
	const isBrowser = typeof window !== 'undefined';
	if (isBrowser && browserClient) return browserClient;
	const client = svelteQueryWrapper<TRPCRouter>({
		client: createTRPCClient<TRPCRouter>({ init }),
		queryClient
	});
	if (isBrowser) browserClient = client;
	return client;
}
