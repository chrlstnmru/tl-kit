import { authProviderList } from '$lib/server/auth/providers';

export async function load({ locals }) {
	return {
		authProviderList,
		user: locals.user
	};
}
