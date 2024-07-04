/**
 * Imports necessary modules ,models and services 
 */
import httpStatus from "http-status";
import appError from "../../common/utils/appError";
import constant from "../../common/config/constant";
import userModel from "../../model/userModel";
import bcrypt from "bcrypt";
import { Request } from "express";


/**
 * Performs user login authentication.
 * Retrieves user data based on the provided email, validates password,
 * and returns the user data if authentication is successful.
 * Throws an error if user is not found, password is incorrect,
 * or any other error occurs during authentication.
 * @param {Request} req - The request object.
 * @param {string} email - The user's email address for login.
 * @param {string} password - The user's password for login.
 * @returns {Promise<any>} - Resolves with the authenticated user data.
 * @throws {appError} - Throws an appError with appropriate status and message on failure.
 */
const login = async (req: Request, email: string, password: string) => {
  try {
    // Find user by email and ensure user status is not DELETE or INACTIVE
    const userData = await userModel.findOne({
      email: email,
      status: { $nin: [constant.STATUS.DELETE, constant.STATUS.INACTIVE] },
    });

    // Throw error if user data not found
    if (!userData) {
      throw new appError(
        httpStatus.NOT_FOUND,
        (req as any).t("errorMessages.userNotFound")
      );
    }

    // Retrieve stored user password and compare with input password
    const userpwd = userData.password?.toString();
    if (!userpwd) {
      throw new appError(
        httpStatus.NOT_FOUND,
        (req as any).t("errorMessages.userNotFound")
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, userpwd);

    // Throw error if password does not match
    if (!isPasswordMatch) {
      throw new appError(
        httpStatus.UNAUTHORIZED,
        (req as any).t("errorMessages.incorrectPassword")
      );
    }

    // Return authenticated user data if successful
    return userData;
  } catch (error: any) {
    // Rethrow error with appropriate status and message
    throw new appError(error.status, error.message);
  }
};

/**
 * Handles user signup.
 * Hashes the provided password using bcrypt, creates a new user record
 * in the database with the provided email, fullname, and hashed password,
 * and returns the created user data.
 * Throws an error if any error occurs during user creation.
 * @param {Request} req - The request object.
 * @param {string} email - The user's email address for signup.
 * @param {string} password - The user's password for signup.
 * @param {string} fullname - The user's full name for signup.
 * @returns {Promise<any>} - Resolves with the created user data.
 * @throws {appError} - Throws an appError with appropriate status and message on failure.
 */
const signup = async (req: Request, email: string, password: string, fullname: string) => {
  try {
    // Hash the provided password using bcrypt
    password = await bcrypt.hash(password, constant.saltRounds);

    // Create a new user record in the database
    return await userModel.create({
      email: email,
      fullName: fullname,
      password: password,
    });
  } catch (error: any) {
    // Rethrow error with appropriate status and message
    throw new appError(error.status, error.message);
  }
};
  export default {
    login,
    signup
  };