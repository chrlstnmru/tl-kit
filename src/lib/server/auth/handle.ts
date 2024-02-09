import { redirect, type Handle } from '@sveltejs/kit';
import authProviders, { type AuthProvider } from './providers';

export const authHandle: Handle = async ({ event, resolve }) => {
	const { url } = event;
	const { pathname } = url;

	// If the request is not an OAuth request, return the event
	if (!pathname.startsWith('/api/oauth')) return resolve(event);

	// Get the OAuth provider from the URL
	const providerUrl = pathname.split('/')[3];
	console.log(providerUrl);

	// If the OAuth provider is not supported, return the event
	const provider = authProviders[providerUrl as AuthProvider];
	if (!provider) return resolve(event);

	// If the request is an OAuth callback, handle the callback
	if (pathname.endsWith('/callback')) {
		const sessionCookie = await provider.validateAuthCallback(event);
		console.log(pathname);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});
		return redirect(302, '/');
	}

	// If the request is an OAuth request, redirect to the OAuth provider
	const authUrl = await provider.createAuthUrl(event);
	return redirect(302, authUrl);
};
