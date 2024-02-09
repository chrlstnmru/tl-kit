import { browser } from '$app/environment';
import type { QueryClient } from '@tanstack/svelte-query';
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { TRPCRouter } from './router';

let browserClient: ReturnType<typeof svelteQueryWrapper<TRPCRouter>>;

export function trpc(init?: TRPCClientInit, queryClient?: QueryClient) {
	if (browser && browserClient) return browserClient;
	const client = svelteQueryWrapper<TRPCRouter>({
		client: createTRPCClient<TRPCRouter>({ init }),
		queryClient
	});
	if (browser) browserClient = client;
	return client;
}
