import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import mysql from 'mysql2/promise';
import * as schema from './schema.ts';

// Cek apakah mode MySQL aktif (jika MYSQL_DATABASE atau process.env.USE_MYSQL disetel, atau di localhost)
const isMySQLConfigured = Boolean(
  process.env.MYSQL_DATABASE || 
  process.env.MYSQL_USER || 
  process.env.MYSQL_HOST
);

let mysqlPool: mysql.Pool | null = null;

if (isMySQLConfigured || !process.env.SQL_HOST) {
  try {
    mysqlPool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'bloodcare_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  } catch (err) {
    console.error('Inisialisasi pool MySQL gagal:', err);
  }
}

export { mysqlPool };

// Pool Postgres fallback untuk Cloud deployment
declare global {
  var _postgresPool: Pool | undefined;
}

export const createPool = () => {
  if (!global._postgresPool) {
    global._postgresPool = new Pool({
      host: process.env.SQL_HOST || 'localhost',
      user: process.env.SQL_USER || 'postgres',
      password: process.env.SQL_PASSWORD || '',
      database: process.env.SQL_DB_NAME || 'bloodcare',
      max: 10,
      connectionTimeoutMillis: 15000,
    });

    global._postgresPool.on('error', (err) => {
      console.error('Unexpected error on idle SQL pool client:', err);
    });
  }
  return global._postgresPool;
};

const pool = createPool();
export const db = drizzle(pool, { schema });
