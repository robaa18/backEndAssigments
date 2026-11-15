
import { unauthorizedUser } from "../../../errors.js";
import jwt from "jsonwebtoken";
import { refreshUserToken } from "../../utils/securityUtils/refreshUserToken.js";
import { validateRefreshToken } from "../../utils/securityUtils/validateRefreshToken.js";
import { JWT_SECRET } from "../../config/config.js";
import { checkAccountIsBanned } from "../../userAccount/AccountBan.js";

export async function authGuard(req, res, next) {
  try {
    const accessToken = req.cookies?.["access-token"];
    const refreshToken = req.cookies?.["refresh-token"];

    if (!accessToken) {
      throw unauthorizedUser;
    }

    let payload;
    let isAccessTokenExpired = false;

    try {
      payload = jwt.verify(accessToken, JWT_SECRET);
    } catch (err) {
      if (!(err instanceof jwt.TokenExpiredError)) {
        throw unauthorizedUser;
      }

      payload = validateRefreshToken(refreshToken);
      isAccessTokenExpired = true;
    }

    // Check account status before continuing
    await checkAccountIsBanned(payload.id);

    req.user = payload;

    if (isAccessTokenExpired) {
      await refreshUserToken(payload, res);
    }

    return next();

  } catch (error) {
    return next(error);
  }
}
