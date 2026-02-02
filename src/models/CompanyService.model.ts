import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const CompanyService = sequelize.define(
  "companyService",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    details: {
      type: DataTypes.TEXT,
    },
    otherDetails: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "CompanyService",
    freezeTableName: true,
    timestamps: true,
  },
);
