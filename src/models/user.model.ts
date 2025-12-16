import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const userModel = sequelize.define(
  "user",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
  },
  { tableName: "user", freezeTableName: true, timestamps: true }
);

await userModel.sync();
