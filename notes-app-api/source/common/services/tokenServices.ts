/**
 * Imports necessary modules for handling authentication and error handling.
 * @module authentication
 * @requires moment
 * @requires jwt
 * @requires config
 * @requires appError
 * @requires httpStatus
 * @requires Request
 */
import moment from "moment";
import jwt from "jsonwebtoken";
import config from "./../config/config";
import appError from "../utils/appError";
import httpStatus from "http-status";
import { Request } from "express";

/**
 * Generates a JWT token for the given user and role with the specified expiration time.
 * @param {any} user - The user object for whom the token is generated.
 * @param {any} role - The role of the user.
 * @param {{ unix: () => any }} expires - The expiration time of the token.
 * @param {string} [secret=config.jwt.secret] - The secret key used to sign the token.
 * @returns {string} A JWT token signed with the secret key.
 */
const generateToken = (
  user: any,
  role: any,
  expires: { unix: () => any },
  secret = config.jwt.secret
) => {
  const payload = {
    sub: { user, role },
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

/**
 * Generates authentication tokens for a user with the given userId and role.
 * @param {string} userId - The user ID for whom the tokens are generated.
 * @param {string} role - The role of the user.
 * @returns An object containing the access token and refresh token with their expiration dates.
 */
const generateAuthTokens = async (userId: string, role: string) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "days"
  );
  const accessToken = generateToken(userId, role, accessTokenExpires);
  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(userId, role, refreshTokenExpires);
  return {
    accessToken: {
      token: accessToken,
    },
    refreshToken: {
      token: refreshToken,
    },
  };
};

/**
 * Verifies the authenticity of a token using the JWT library.
 * @param {string} token - The token to be verified.
 * @param {Request} req - The request object containing additional information.
 * @returns The payload of the verified token.
 * @throws {appError} If the token is invalid or expired.
 */
const verifyToken = async (token: string, req: Request) => {
 
  const payload: any = await jwt.verify(token, config.jwt.secret);
  // const payload: any = await jwt.verify(mytoken, secretKey);

  // const tokenDoc: any = await tokens.findOne({ token, type, user: payload.sub.user._id });
  if (!payload) {
    throw new appError(
      httpStatus.NOT_FOUND,
      (req as any).t("errorMessages.linkExpired")
    );
  }
  return payload;
};

export default {
  generateAuthTokens,
  generateToken,
  verifyToken,
};
