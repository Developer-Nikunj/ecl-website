import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const contactFormModel = sequelize.define(
  "role",
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
    phone: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
    noteByAdmin: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  },
  { tableName: "role", freezeTableName: true, timestamps: true }
);

await contactFormModel.sync();
