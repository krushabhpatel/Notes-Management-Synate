import { appError } from "./typeAliases";

/**
 * Represents an application-specific error that extends the built-in Error class
 * and implements the appError interface.
 * @param {number} statusCode - The HTTP status code of the error.
 * @param {string} message - The error message.
 * @param {boolean} [isOperational=true] - Indicates if the error is operational.
 * @param {string} [stack=""] - The stack trace of the error.
 */
class AppError extends Error implements appError {
  status: number;
  isOperational: boolean;
  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.status = statusCode || 500;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
