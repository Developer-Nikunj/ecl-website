import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const footerModel = sequelize.define(
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "footer", freezeTableName: true, timestamps: true }
);

await footerModel.sync();
