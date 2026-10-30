import { configExports } from "../../lib/index.js";
import Mailjet from "node-mailjet";
const mailjet = new Mailjet({
  apiKey: configExports.MAIL_JET_API_KEY,
  apiSecret: configExports.MAIL_JET_API_SECRET,
});
export const sendEmail = async (to, subject, html) => {
  try {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: configExports.ACCOUNT_MAIL,
            Name: "Sara7aApp",
          },
          To: [
            {
              Email: to,
              Name: "You",
            },
          ],
          Subject: subject,
          TextPart: "hello!",
          HTMLPart: html,
        },
      ],
    });
  } catch (err) {
    console.log("failed to send email", err);
  }
};
