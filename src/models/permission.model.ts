import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db";

import {Menu} from "./menu.model";

interface PermissionAttributes {
  id: number;
  userId: number;
  menuId?: number;
  permission: boolean;
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, "id"> {}

export class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  declare id: number;
  declare userId: number;
  declare menuId?: number;
  declare permission: boolean;
  declare Menu?: Menu;
}

export const permissionModel = Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    permission: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "permission",
    freezeTableName: true,
    timestamps: true,
  }
);


await permissionModel.sync({alter:true});