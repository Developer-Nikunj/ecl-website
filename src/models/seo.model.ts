import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const seoModel = sequelize.define(
  "seo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    pageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  { tableName: "seo", freezeTableName: true, timestamps: true }
);

await seoModel.sync();
