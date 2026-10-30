import { WEB_CLIENT_ID } from "../../config/config.js";
import { OAuth2Client } from "google-auth-library";
import  AppError  from "../../../pkg/errorHandling/appError.js";
const client = new OAuth2Client();
export async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: WEB_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}