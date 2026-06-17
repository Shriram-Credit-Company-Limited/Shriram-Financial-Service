import { Pool } from 'pg';

// Pool is null until DATABASE_URL is set in environment variables.
// When you connect Amazon RDS, set:
//   DATABASE_URL=postgresql://user:password@your-rds-endpoint:5432/shriram_financial
//
// SSL is required for Amazon RDS — rejectUnauthorized: false accepts the AWS
// self-signed cert. For tighter security, supply the RDS CA bundle instead.
export const pool: Pool | null = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    })
  : null;
