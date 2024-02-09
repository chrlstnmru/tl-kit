import delay from 'delay';
import { createTRPCRouter, publicProcedure } from '../root';

export const greet = createTRPCRouter({
	hello: publicProcedure.query(() => 'Hello!'),
	goodbye: publicProcedure.query(async () => {
		await delay(1000);
		return 'Goodbye!';
	})
});
