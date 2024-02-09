import delay from 'delay';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../root';

export const greet = createTRPCRouter({
	hello: publicProcedure.query(() => 'Hello!'),
	goodbye: publicProcedure.query(async () => {
		await delay(1000);
		return 'Goodbye!';
	}),
	secret: protectedProcedure.query(() => 'You are awesome!')
});
