export async function load({ parent, data }) {
	const { trpcClient } = await parent();

	return {
		...data,
		prefetchedMsg: await trpcClient.greet.hello.createServerQuery(),
		secret: await trpcClient.greet.secret.createServerQuery()
	};
}
