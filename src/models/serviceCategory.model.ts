import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const ServiceCategory = sequelize.define(
  "serviceCategory",
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
    tableName: "ServiceCategory",
    freezeTableName: true,
    timestamps: true,
  },
);


// await ServiceCategory.sync({alter:true});