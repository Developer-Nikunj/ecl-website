import { userModel } from "./user.model";
import { menuModel } from "./menu.model";
import { permissionModel } from "./permission.model";

/* User <-> Permission */
userModel.hasMany(permissionModel, {
  foreignKey: "userId",
  as: "permissions",
});

permissionModel.belongsTo(userModel, {
  foreignKey: "userId",
  as: "user",
});

/* Menu <-> Permission */
menuModel.hasMany(permissionModel, {
  foreignKey: "menuId",
  as: "permissions",
});

permissionModel.belongsTo(menuModel, {
  foreignKey: "menuId",
  as: "menu",
});
