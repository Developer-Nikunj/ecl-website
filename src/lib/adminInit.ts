
import { User } from "@/models/user.model";
import {menuModel} from "@/models/menu.model"
import { Permission } from "@/models/permission.model";
import bcrypt from "bcrypt";

export async function initAdmin() {
  // ensure table exists

  const adminExists = await User.findOne({
    where: { role: "admin" },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

    const firstAdmin = await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      emailVerified:true,
    });

    const a = await menuModel.create({
      slug: "menu",
      menuName: "postmenu",
      status: true,
    });
    const b = await menuModel.create({
      slug: "menu",
      menuName:"putmenu",
      status:true,
    });
    const c = await menuModel.create({
      slug: "menu",
      menuName:"getmenu",
      status:true,
    });
    const d = await menuModel.create({
      slug: "menu",
      menuName:"deletemenu",
      status:true,
    });
    const e = await menuModel.create({
      slug: "user",
      menuName: "postuser",
      status: true,
    });
    const f = await menuModel.create({
      slug: "user",
      menuName: "putuser",
      status: true,
    });
    const g = await menuModel.create({
      slug: "user",
      menuName: "getuser",
      status: true,
    });
    const h = await menuModel.create({
      slug: "user",
      menuName: "deleteuser",
      status: true,
    });
    const i = await menuModel.create({
      slug: "permission",
      menuName: "postpermission",
      status: true,
    });
    const j = await menuModel.create({
      slug: "permission",
      menuName: "putpermission",
      status: true,
    });
    const k = await menuModel.create({
      slug: "permission",
      menuName: "getpermission",
      status: true,
    });
    const l = await menuModel.create({
      slug: "permission",
      menuName: "deletepermission",
      status: true,
    });

    await Permission.create({
      userId: firstAdmin.id,
      menuId: a.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: b.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: c.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: d.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: e.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: f.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: g.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: h.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: i.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: j.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: k.id,
      permission:true,
    });
    await Permission.create({
      userId: firstAdmin.id,
      menuId: l.id,
      permission:true,
    });




    console.log("✅ Admin user auto-created");
  } else {
    console.log("ℹ️ Admin already exists");
  }
}
