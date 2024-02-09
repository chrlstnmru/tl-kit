import { TRPCError, initTRPC } from '@trpc/server';
import type { TRPCContext } from './context';

const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;
export const middleware = t.middleware;

export const isAuthed = middleware(async ({ ctx, next }) => {
	if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return next();
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
