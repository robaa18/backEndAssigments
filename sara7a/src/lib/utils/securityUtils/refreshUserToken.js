import { generateToken } from "./token.js";
import { toMs } from "../../../pkg/utils/time/time.js";
export async function refreshUserToken(payload, res) {
  const accessToken =await generateToken(payload , "1h");
  return res.cookie("access-token", accessToken, {
    httpOnly: true,
    maxAge: toMs(1, "hours"),
  });
}
