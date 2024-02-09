import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { type RequestEvent } from '@sveltejs/kit';
import { GitHub, generateState } from 'arctic';
import {
	authCallbackValidationWrapper,
	createOAuthUser,
	deserializeAuthCallback
} from '../helpers';
import { oauthDefaultCookieAttributes } from '../root';

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

function githubAuthProvider() {
	const githubStateCookie = 'github_oauth_state';

	const createAuthUrl = async (event: RequestEvent) => {
		const state = generateState();
		const url = await github.createAuthorizationURL(state);
		event.cookies.set(githubStateCookie, state, { ...oauthDefaultCookieAttributes, path: '/' });

		return url;
	};

	const validateAuthCallback = async (event: RequestEvent) => {
		// Get the code from the URL and the state from the cookie
		const { code } = deserializeAuthCallback(event, githubStateCookie);

		// Validates and returns the session cookie
		const result = await authCallbackValidationWrapper(async () => {
			const { accessToken } = await github.validateAuthorizationCode(code);

			// GitHub OAuth2 endpoint
			const response = await fetch('https://api.github.com/user', {
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
				credentials: 'include'
			});
			const result = await response.json();

			const account = await createOAuthUser('github', result.id, { username: result.login });
			return account;
		});

		return result;
	};

	return { createAuthUrl, validateAuthCallback };
}

export default githubAuthProvider;
