import { ACCOUNT_PASSWORD, ACCOUNT_MAIL } from "../../lib/config/config.js";
import nodemailer from "nodemailer";
import AppError from "../errorHandling/appError.js";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: ACCOUNT_MAIL,
    pass: ACCOUNT_PASSWORD,
  },
});
export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"sara7aApp" <${ACCOUNT_MAIL}>`,
      to: to,
      subject: subject,
      html: html,
    });
  } catch (err) {
    console.log("failed to send email", err);
  }
};
