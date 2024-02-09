import { DB_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import sqlite from 'better-sqlite3';

const sqliteDB = new sqlite(DB_URL);
export const db = drizzle(sqliteDB);
