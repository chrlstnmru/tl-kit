import { createTRPCRouter, publicProcedure } from '../root';

export const greet = createTRPCRouter({
	hello: publicProcedure.query(() => 'Hello!')
});
