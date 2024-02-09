import { createTRPCRouter } from './root';
import { greet } from './routes';

export const trpcRouter = createTRPCRouter({
	greet
});

export type TRPCRouter = typeof trpcRouter;
