import { sequelize } from "@/database/db";
import "@/models/user.model";
import { initAdmin } from "./adminInit";

export async function startup() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // first time → creates tables
    await initAdmin();

    console.log("✅ App bootstrap complete");
  } catch (err) {
    console.error("❌ Bootstrap failed:", err);
    process.exit(1);
  }
}