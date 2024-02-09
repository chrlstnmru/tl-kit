import delay from 'delay';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../root';

export const greet = createTRPCRouter({
	hello: publicProcedure.query(() => 'Did you know that this message was prefetched just for you?'),
	followup: publicProcedure.query(async () => {
		await delay(2500);
		return 'The wait is over! Start building your app now!';
	}),
	secret: protectedProcedure.query(() => 'Keep this message a secret! 😉')
});
