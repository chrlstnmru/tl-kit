import { redirect, type Handle } from '@sveltejs/kit';
import { validateSession } from './helpers';
import authProviders, { type AuthProvider } from './providers';
import { auth } from './root';

const OAUTH_ROUTE = '/api/oauth';

export const authHandle: Handle = async ({ event, resolve }) => {
	// Validate current session
	await validateSession(event);

	const { url } = event;
	const { pathname } = url;

	// If the request is a sign-out request, invalidate the session
	if (pathname === '/api/auth/sign-out') {
		if (!event.locals.session) return redirect(302, '/');

		await auth.invalidateSession(event.locals.session.id);
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			...sessionCookie.attributes,
			path: '/'
		});

		return redirect(302, '/');
	}

	// If the request is not an OAuth request, return the event
	if (!pathname.startsWith(OAUTH_ROUTE)) return resolve(event);

	// Get the OAuth provider from the URL
	const providerUrl = pathname.split('/')[3];

	// If the OAuth provider is not supported, return the event
	const provider = authProviders[providerUrl as AuthProvider];
	if (!provider) return resolve(event);

	// If the request is an OAuth callback, handle the callback
	if (pathname.endsWith('/callback')) {
		const sessionCookie = await provider.validateAuthCallback(event);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			...sessionCookie.attributes,
			path: '/'
		});
		return redirect(302, '/');
	}

	// If the request is an OAuth request, redirect to the OAuth provider
	const authUrl = await provider.createAuthUrl(event);
	return redirect(302, authUrl);
};
