/**
 * Imports necessary modules and middleware for the authentication routes.
 */
import express from "express";
import validate from "../../common/middlewares/validate";
import authValidation from "./authValidation";
import authController from "./authController";
import methodNotAllowed from "../../common/utils/methodNotFound";

const router = express.Router();

/**
 * Defines the routes for login and signup endpoints.
 * POST /login - Validates the login request and calls the login controller function.
 * POST /signup - Validates the signup request and calls the signup controller function.
 * For any other HTTP method used on these routes, the methodNotAllowed function is called.
 * @returns None
 */
router
  .route("/login")
  .post(validate(authValidation.login), authController.login)
  .all(methodNotAllowed);

  router
  .route("/signup")
  .post(validate(authValidation.signup), authController.signup)
  .all(methodNotAllowed);

export default router;