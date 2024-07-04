/**
 * Imports necessary modules and libraries for handling JWT, Express requests and responses,
 * HTTP status codes, response creation, user roles and rights configuration, application errors,
 * user model, and application constants.
 * @param jwt - The JSON Web Token library for encoding and decoding tokens.
 * @param Secret - The type representing the secret key used for JWT encoding and decoding.
 * @param JwtPayload - The type representing the payload of a JWT token.
 * @param Request - The Express request object.
 * @param Response - The Express response object.
 * @param NextFunction - The Express next function.
 * @param httpStatus - The library for HTTP status codes.
 * @param createResponse - The utility function for creating HTTP responses.
 *
 */
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import createResponse from "./../utils/response";
import { roleRights } from "../config/roles";
import appError from "../utils/appError";
import userModel from "../../model/userModel";
import constant from "../../common/config/constant";

/**
 * Middleware function to authenticate user requests based on their JWT token.
 * @param {string} routeMethod - The method of the route being accessed.
 * @returns None
 * This middleware function checks the JWT token in the request header for authentication.
 * It verifies the token, checks user rights, and ensures the user account is active.
 * If the token is expired or invalid, appropriate error responses are sent.
 */
const auth =
  (routeMethod: string) =>
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const secretKey: any = process.env.JWT_SECRET;
      const token: any = req.header("Authorization");

      if (!token) {
        throw new appError(
          httpStatus.UNAUTHORIZED,
          (req as any).t("errorMessages.needAuthentication")
        );
      } else {
        const decoded = jwt.verify(token, secretKey);
        const userData: any = decoded.sub;
        if (routeMethod) {
          

          let converarray = [routeMethod];
          // const userData: any = decoded.sub;
          const userRights = roleRights.get(userData.role);

          const hasRequiredRights = converarray.every((requiredRight) =>
            userRights.includes(requiredRight)
          );


          if (!hasRequiredRights) {
            throw new appError(
              httpStatus.FORBIDDEN,
              (req as any).t("errorMessages.authenticationFailed")
            );
          }
        }

        // req.user = decoded.sub;
        let id: any = userData.user;
        const findUser: any = await userModel.findById(id);
        (req as any)["user"] = userData;
        if (!findUser) {
          throw new appError(
            httpStatus.NOT_FOUND,
            (req as any).t("errorMessages.userIdNotFound")
          );
        }
        if (findUser.status === constant.STATUS.INACTIVE) {
          throw new appError(
            httpStatus.FORBIDDEN,
            (req as any).t("errorMessages.accountInactive")
          );
        }
        if (findUser.status === constant.STATUS.DELETE) {
          throw new appError(
            httpStatus.GONE,
            (req as any).t("errorMessages.accountDeleted")
          );
        }
        next();
      }
    } catch (err: any) {
      if (err.message === "jwt expired") {
        createResponse(
          res,
          httpStatus.UNAUTHORIZED,
          (req as any).t("errorMessages.tokenExpire")
        );
      } else if (err.message === "invalid signature") {
        createResponse(
          res,
          httpStatus.UNAUTHORIZED,
          (req as any).t("errorMessages.invalidAccessToken")
        );
      } else {
        createResponse(res, err.status, err.message);
      }
    }
  };

export default auth;
