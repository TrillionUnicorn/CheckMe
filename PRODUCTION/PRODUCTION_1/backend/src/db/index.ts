import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/checkme';

export const sql = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Test connection
try {
  await sql`SELECT 1`;
  console.log('✅ Database connected successfully');
} catch (error) {
  console.error('❌ Database connection failed:', error);
  console.log('💡 Using in-memory storage for demo');
}

export default sql;

