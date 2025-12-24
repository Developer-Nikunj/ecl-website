import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db";

interface PermissionAttributes {
  id: number;
  userId: number;
  menu?: number;
  permission: boolean;
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, "id"> {}

export class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  declare id: number;
  declare userId: number;
  declare menu?: number;
  declare permission: boolean;
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
    menu: {
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