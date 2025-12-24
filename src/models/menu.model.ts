import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db";

interface MenuAttributes {
  id: number;
  menuName: string;
  slug: string;
  status: boolean;
}

interface MenuCreationAttributes extends Optional<MenuAttributes, "id"> {}

export class Menu
  extends Model<MenuAttributes, MenuCreationAttributes>
  implements MenuAttributes
{
  declare id: number;
  declare menuName: string;
  declare slug: string;
  declare status: boolean;
}

export const menuModel = Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    menuName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "menu",
    freezeTableName: true,
    timestamps: true,
  }
);


await menuModel.sync({alter:true});