import { dev } from '$app/environment';
import { db } from '$lib/db/root';
import { sessionTable, userTable } from '$lib/db/schema/user';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia, type CookieAttributes } from 'lucia';

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// cookies are only sent over HTTPS in production
			secure: !dev
		}
	},
	getUserAttributes: (attrib) => {
		return {
			username: attrib.username
		};
	}
});

export const oauthDefaultCookieAttributes: CookieAttributes = {
	path: '/',
	secure: !dev,
	httpOnly: true,
	maxAge: 60 * 10,
	sameSite: 'lax'
};

declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}
