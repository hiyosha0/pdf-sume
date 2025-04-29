import { neon, neonConfig } from "@neondatabase/serverless";

let sql: any;

export async function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Database url not defined");
  }

  if (!sql) {
    try {
      // Create a new SQL connection if one doesn't exist
      sql = neon(process.env.DATABASE_URL);
      console.log("Created new database connection");
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }

  return sql;
}

// Export the SQL connection for direct use
export { sql };
