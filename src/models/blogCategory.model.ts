import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const blogCategoryModel = sequelize.define(
  "BlogCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "BlogCategory", freezeTableName: true, timestamps: true }
);

// await blogCategoryModel.sync();
