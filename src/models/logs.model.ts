import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/database/db";

export class Log extends Model {}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    action: {
      type: DataTypes.STRING,
    },
    ipAddress: {
      type: DataTypes.STRING,
    },
    requestMethod: {
      type: DataTypes.STRING,
    },
    endPoint: {
      type: DataTypes.STRING,
    },
    userAgent: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "Log",
  }
);

await Log.sync({ alter: true });
