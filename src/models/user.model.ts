import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db";

interface UserAttributes {
  id: number;
  name?: string;
  token?: string;
  email: string;
  password: string;
  img?: string;
  otp?: string;
  role: string;
  actions?: any[];
  emailVerified?: boolean;
  status: boolean;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "otp" | "actions" | "emailVerified" | "token" | "name" | "img"
  > {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare name?: string;
  declare token?: string;
  declare email: string;
  declare img?: string;
  declare password: string;
  declare otp?: string;
  declare role: string;
  declare actions?: any[];
  declare emailVerified?: boolean;
  declare status: boolean;
}

export const userModel = User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "assets/backend/images/users/avatar-1.jpg",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    actions: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "user",
    freezeTableName: true,
    timestamps: true,
  }
);

await userModel.sync({alter:true});
