import { primaryKey, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey()
	// ... other user attributes
});
export type UserInsert = typeof userTable.$inferInsert;

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const oauthTable = sqliteTable(
	'oauth_account',
	{
		providerId: text('provider_id').notNull(),
		providerUserId: text('provider_user_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => userTable.id)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.providerId, table.providerUserId] })
	})
);
export type OAuthSelect = typeof oauthTable.$inferSelect;
