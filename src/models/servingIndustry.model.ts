import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const servingIndustryModel = sequelize.define(
  "servingIndustry",
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
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "servingIndustry", freezeTableName: true, timestamps: true },
);

await servingIndustryModel.sync({alter:true});
