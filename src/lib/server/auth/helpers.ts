import { error, type RequestEvent } from '@sveltejs/kit';
import { OAuth2RequestError } from 'arctic';
import { auth } from './root';
import { generateId } from 'lucia';
import { oauthTable, userTable, type UserInsert, type OAuthSelect } from '$lib/db/schema/user';
import { db } from '$lib/db/root';
import { and, eq } from 'drizzle-orm';

export function deserializeAuthCallback(event: RequestEvent, cookieName: string) {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get(cookieName);

	console.log(code, state, storedState);

	if (!code || !state || !storedState || state !== storedState) {
		return error(400, 'Invalid OAuth request');
	}

	return { code, state, storedState };
}

export async function createAuthCookieSession(userId: string, attributes: object = {}) {
	const session = await auth.createSession(userId, attributes);
	const sessionCookie = auth.createSessionCookie(session.id);
	return sessionCookie;
}

export async function createOAuthUser(
	providerId: string,
	providerUserId: string,
	newUserData?: Omit<UserInsert, 'id'>
) {
	// Check if user already exists
	const [account] = await db
		.selectDistinct()
		.from(oauthTable)
		.where(
			and(eq(oauthTable.providerId, providerId), eq(oauthTable.providerUserId, providerUserId))
		)
		.limit(1);

	// If user exists, return user
	if (account) {
		return account;
	}

	// If user does not exist, create user
	const userId = generateId(15);
	const newAccount = await db.transaction(async (trx) => {
		await trx.insert(userTable).values({ id: userId, ...newUserData });
		return await trx.insert(oauthTable).values({ providerId, providerUserId, userId }).returning();
	});

	// Return new user
	return newAccount[0];
}

export async function authCallbackValidationWrapper(fn: () => Promise<OAuthSelect>) {
	try {
		// Validate the OAuth request
		const account = await fn();

		// Create a session cookie
		return await createAuthCookieSession(account.userId);
	} catch (err) {
		console.log('Auth Error', err);
		if (err instanceof OAuth2RequestError) {
			console.log('Auth Error', err);
			return error(400, 'Invalid OAuth request');
		}
		return error(500, 'Internal server error');
	}
}
