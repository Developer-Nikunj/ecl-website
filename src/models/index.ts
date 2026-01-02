import { userModel } from "./user.model";
import { menuModel } from "./menu.model";
import { permissionModel } from "./permission.model";

/* User <-> Permission */
userModel.hasMany(permissionModel, {
  foreignKey: "userId",
});
permissionModel.belongsTo(userModel, {
  foreignKey: "userId",
});

/* Menu <-> Permission */
menuModel.hasMany(permissionModel, {
  foreignKey: "menuId",
});
permissionModel.belongsTo(menuModel, {
  foreignKey: "menuId",
});
