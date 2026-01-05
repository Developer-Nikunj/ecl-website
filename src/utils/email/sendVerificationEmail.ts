import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { sequelize } from "@/database/db";

// export async function sendEmailToUser(
//   to: string,
//   otp: string,
//   name:string
// ) {
//   const status = "Active";

//   const query = `SELECT template, description FROM templates WHERE name = :name and status = :status limit 1`;
//   const [rows] = await sequelize.query(query, {
//     replacements: { name, status },
//   });

//   if (!rows || rows.length === 0) {
//     throw new Error("Template not found");
//   }

//   const templateString = rows[0].template;
//   const subjectString = rows[0].description;

//   const compile = Handlebars.compile(templateString);
//   const html = compile({
//     email: to,
//     otp: otp,
//     year: new Date().getFullYear(),
//   });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   return transporter.sendMail({
//     to,
//     subject: subjectString,
//     html,
//   });
// }


export async function sendEmailToUser(to: string, otp: string) {
  const templateString = `
    <div style="font-family: Arial, sans-serif; line-height:1.6; max-width:600px; margin:auto;">
      <h2>Hello,</h2>
      <p>Your One-Time Password (OTP) is:</p>
      <p style="font-size:24px; font-weight:bold; letter-spacing:2px;">
        {{otp}}
      </p>
      <p>This OTP is valid for the next 5 minutes.</p>
      <p>If you didn’t request this, please ignore this email.</p>
      <hr />
      <p style="font-size:12px; color:#666;">
        © {{year}} MyCompany. All rights reserved.
      </p>
    </div>
  `;

  const subjectString = "Your OTP Code";

  const compile = Handlebars.compile(templateString);
  const html = compile({
    otp,
    year: new Date().getFullYear(),
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter.sendMail({
    from: `"MyCompany" <${process.env.SMTP_USER}>`,
    to,
    subject: subjectString,
    html,
  });
}
