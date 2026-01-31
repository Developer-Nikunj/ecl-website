
import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const templateModel = sequelize.define(
  "template",
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
    templateType: {
      type: DataTypes.ENUM("whattsapp", "email"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "InActive"),
      defaultValue: "Active",
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "templates", freezeTableName: true, timestamps: true }
);

// await templateModel.sync();
