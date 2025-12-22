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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.TEXT, // comma-separated
      allowNull: true,
    },
    robots: {
      type: DataTypes.STRING,
      defaultValue: "index, follow",
    },
    canonicalUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ogTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ogDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ogImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schema: {
      type: DataTypes.JSON, // JSON-LD only
      allowNull: true,
    },
  },
  { tableName: "seo", freezeTableName: true, timestamps: true }
);

await seoModel.sync();
