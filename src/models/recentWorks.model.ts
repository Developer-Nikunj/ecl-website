import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const RecentWorksModel = sequelize.define(
  "RecentWorks",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    categories: {
      type: DataTypes.JSON, // store array of strings
      allowNull: false,
      defaultValue: [],
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "RecentWorks",
    freezeTableName: true,
    timestamps: true,
  },
);

// To create the table (sync with DB)
// await RecentWorksModel.sync({alter:true});
