import { createTRPCContext } from '$lib/trpc/context';
import { trpcRouter } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';

const sveltekitHandle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

const trpcHandle: Handle = createTRPCHandle({
	router: trpcRouter,
	createContext: createTRPCContext
});

export const handle: Handle = sequence(trpcHandle, sveltekitHandle);
