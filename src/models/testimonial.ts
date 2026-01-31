import { DataTypes } from "sequelize";

import { sequelize } from "@/database/db";
export const testimonialModel = sequelize.define(
  "testimonial",
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
  { tableName: "testimonial", freezeTableName: true, timestamps: true }
);

// await testimonialModel.sync();
