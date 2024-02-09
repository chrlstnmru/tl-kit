import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { type RequestEvent } from '@sveltejs/kit';
import { Google, generateCodeVerifier, generateState } from 'arctic';
import {
	authCallbackValidationWrapper,
	createOAuthUser,
	deserializeAuthCallback
} from '../helpers';
import { oauthDefaultCookieAttributes } from '../root';

const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	new URL('/api/oauth/google/callback', PUBLIC_BASE_URL).toString()
);

function googleAuthProvider() {
	const googleStateCookie = 'google_oauth_state';
	const googleCodeVerifier = generateCodeVerifier();

	const createAuthUrl = async (event: RequestEvent) => {
		const state = generateState();
		const url = await google.createAuthorizationURL(state, googleCodeVerifier);
		event.cookies.set(googleStateCookie, state, { ...oauthDefaultCookieAttributes, path: '/' });
		return url;
	};

	const validateAuthCallback = async (event: RequestEvent) => {
		// Get the code from the URL and the state from the cookie
		const { code } = deserializeAuthCallback(event, googleStateCookie);

		// Validates and returns the session cookie
		const result = await authCallbackValidationWrapper(async () => {
			const { accessToken } = await google.validateAuthorizationCode(code, googleCodeVerifier);

			// Google OAuth2 endpoint
			const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			const result = await response.json();

			console.log(result);

			const account = await createOAuthUser('github', result.id);
			return account;
		});

		return result;
	};

	return { createAuthUrl, validateAuthCallback };
}

export default googleAuthProvider;
