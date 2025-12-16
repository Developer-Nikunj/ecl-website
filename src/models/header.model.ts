import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const headerModel = sequelize.define(
  "header",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "header", freezeTableName: true, timestamps: true }
);

await headerModel.sync();
