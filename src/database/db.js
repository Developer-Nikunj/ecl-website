import { Sequelize } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectModule: pg,
    logging: false,
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
}
