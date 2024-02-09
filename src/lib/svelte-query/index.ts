import type { QueryClientConfig } from '@tanstack/svelte-query';
import SvelteQueryProvider, { useSvelteTRPC } from './svelte-query-provider.svelte';
import { browser } from '$app/environment';

const SvelteQueryConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			enabled: browser,
			refetchOnWindowFocus: false
		}
	}
};

export { SvelteQueryProvider, useSvelteTRPC, SvelteQueryConfig };
