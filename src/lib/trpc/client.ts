import { type TRPCClientInit, createTRPCClient } from 'trpc-sveltekit';
import type { TRPCRouter } from './router';

let browserClient: ReturnType<typeof createTRPCClient<TRPCRouter>>;

export function trpc(init?: TRPCClientInit) {
	const isBrowser = typeof window !== 'undefined';
	if (isBrowser && browserClient) return browserClient;
	const client = createTRPCClient<TRPCRouter>({ init });
	if (isBrowser) browserClient = client;
	return client;
}
