import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const bannerModel = sequelize.define(
  "banner",
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
  { tableName: "banner", freezeTableName: true, timestamps: true }
);

await bannerModel.sync();
