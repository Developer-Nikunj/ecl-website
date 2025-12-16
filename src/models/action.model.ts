import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const actionModel = sequelize.define(
  "action",
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
    description: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "action", freezeTableName: true, timestamps: true }
);

await actionModel.sync();
