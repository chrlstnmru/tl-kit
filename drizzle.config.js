/** @type { import("drizzle-kit").Config } */
export default {
	schema: './src/lib/db/schema/*',
	out: './drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: process.env.DB_URL
	}
};
