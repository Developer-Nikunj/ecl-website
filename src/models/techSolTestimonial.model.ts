import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";

export const TechTestimonialModel = sequelize.define(
  "TechTestimonial",
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    categories: {
      type: DataTypes.JSON, 
      defaultValue: [],
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "TechTestimonial",
    freezeTableName: true,
    timestamps: true,
  },
);

// To create the table (sync with DB)
await TechTestimonialModel.sync({alter:true});
