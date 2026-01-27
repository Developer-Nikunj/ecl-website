import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export class Service extends Model {}

Service.init(
  {
    /* ---------- CORE ---------- */
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1, // 1 = active
    },

    /* ---------- SEO META ---------- */
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    metaKeywords: {
      type: DataTypes.TEXT, // comma separated
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

    /* ---------- OPEN GRAPH ---------- */
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

    /* ---------- SCHEMA ---------- */
    schema: {
      type: DataTypes.JSON, // JSON-LD override
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Service",
    tableName: "services",
    timestamps: true,
  }
);

// optional but recommended
await Service.sync({alter:true});
