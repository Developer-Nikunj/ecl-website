import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const Footer = sequelize.define(
  "footer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "footer", freezeTableName: true, timestamps: true }
);

await Footer.sync();
