import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    img: {
      type: DataTypes.STRING,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    

    excerpt: {
      type: DataTypes.TEXT,
    },

    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "draft",
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "blogs",
    timestamps: true,
    underscored: true,
  }
);


await Blog.sync();
