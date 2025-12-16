import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { sequelize } from "@/database/db";

export async function sendEmailToUser(
  to: string,
  otp: string,
  name:string
) {
  const status = "Active";

  const query = `SELECT template, description FROM templates WHERE name = :name and status = :status limit 1`;
  const [rows] = await sequelize.query(query, {
    replacements: { name, status },
  });

  if (!rows || rows.length === 0) {
    throw new Error("Template not found");
  }

  const templateString = rows[0].template;
  const subjectString = rows[0].description;

  const compile = Handlebars.compile(templateString);
  const html = compile({
    email: to,
    otp: otp,
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
    to,
    subject: subjectString,
    html,
  });
}