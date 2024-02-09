export async function load({ parent }) {
	const { trpcClient } = await parent();

	return {
		prefetchedMsg: await trpcClient.greet.hello.createServerQuery()
	};
}
