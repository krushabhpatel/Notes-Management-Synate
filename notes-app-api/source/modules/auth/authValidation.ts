import Joi from "joi";

/**
 * Validation schema for the login endpoint.
 * Ensures that the body of the request contains a valid email and a required password.
 */
const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().label("email"),
    password: Joi.string().required().label("password"),
  }),
};

/**
 * Validation schema for the signup endpoint.
 * Ensures that the body of the request contains a valid email, a required password, and a full name.
 */
const signup = {
  body: Joi.object().keys({
    email: Joi.string().required().email().label("email"),
    password: Joi.string().required().label("password"),
    fullname: Joi.string().required().label("fullname"),
  }),
};
export default {
    login,
    signup
  };