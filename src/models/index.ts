import { userModel } from "./user.model";
import { menuModel } from "./menu.model";
import { permissionModel } from "./permission.model";
import { Blog } from "./blog.model";
import { blogCategoryModel } from "./blogCategory.model";

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


Blog.belongsTo(blogCategoryModel, {
  foreignKey: "categoryId",
  as: "category",
});

blogCategoryModel.hasMany(Blog, {
  foreignKey: "categoryId",
  as: "blogs",
});