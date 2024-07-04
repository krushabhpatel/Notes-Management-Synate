/**
 * Imports the necessary modules for using dotenv, path, and Joi in the current file.
 * @param None
 * @returns None
 */
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

/**
 * Defines a schema using Joi for validating environment variables.
 * @returns {Joi.ObjectSchema} A Joi object schema for validating environment variables.
 */
const envVarsSchema = Joi.object()

  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "staging")
      .required(),
    PORT: Joi.number().default(3000),

    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    
  })
  .unknown();

/**
 * Validates the environment variables based on the provided schema.
 * @returns None
 * @throws {Error} If there is a validation error, an error is thrown with the message.
 */
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_EXPIRATION_MINUTES,
  },
  email: {
    sendGridKey: envVars.SEND_GRID_KEY,
    from: envVars.EMAIL_FROM,
    sentBy: envVars.EMAIL_SEND_BY,
  },
  razorpay: {
    apiSecret: envVars.API_SCECRET,
    apiKey: envVars.API_KEY,
    webHookSecret: envVars.WEBHOOK_SCECRET,
  },
};
