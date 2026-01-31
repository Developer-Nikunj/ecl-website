import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const contactFormModel = sequelize.define(
  "contactForm",
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
      type: DataTypes.TEXT,
    },
    noteByAdmin: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  },
  { tableName: "contactForm", freezeTableName: true, timestamps: true },
);

// await contactFormModel.sync();
