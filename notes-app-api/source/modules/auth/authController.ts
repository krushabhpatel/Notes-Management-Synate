/**
 * Imports necessary modules and services 
 */
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import createResponse from "../../common/utils/response";
import authServices from "./authServices";
import tokenServices from "../../common/services/tokenServices";


/**
 * Handles the login request.
 * Retrieves the email and password from the request body, performs login authentication,
 * generates authentication tokens, and sends a response with user information and tokens.
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await authServices.login(req, email.toLowerCase(), password);
    const userIdAsString: string = user._id.toString();
    const tokens = await tokenServices.generateAuthTokens(
      userIdAsString,
      user.role
    );
    const response = {
      userId: userIdAsString,
      fullName: user.fullName,
      accessToken: tokens.accessToken.token,
      refreshToken: tokens.refreshToken.token,
    };
    createResponse(
      res,
      httpStatus.OK,
      (req as any).t("successMessages.LoggedIn"),
      response
    );
  } catch (error: any) {
    createResponse(res, error.status, error.message);
  }
};

/**
 * Handles the signup request.
 * Retrieves the email, password, and fullname from the request body,
 * performs user registration, and sends a response indicating successful signup.
 */
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, fullname }: { email: string; password: string; fullname: string } = req.body;
    await authServices.signup(req, email.toLowerCase(), password, fullname);
    createResponse(
      res,
      httpStatus.OK,
      (req as any).t("successMessages.SignUp")
    );
  } catch (error: any) {
    createResponse(res, error.status, error.message);
  }
};


export default {
    login,
    signup
  };