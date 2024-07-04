/**
 * Import the Response object from the Express library and the apiResponse type alias from the typeAliases file.
 */
import { Response } from "express";
import { apiResponse } from "./typeAliases";

/**
 * Creates a response object with the specified status, message, and payload.
 * @param {Response} res - The response object to send the response.
 * @param {number} [status=500] - The status code of the response.
 * @param {string} [message="internal server error"] - The message to include in the response.
 * @param {Array<object> | object} [payload] - The data payload to include in the response.
 * @returns {Response<apiResponse>} The response object with the specified status, message, and payload.
 */
const createResponse = (
  res: Response,
  status: number = 500,
  message: string = "internal server error",
  payload?: Array<object> | object
): Response<apiResponse> => {
  const response: any = {
    message: message,
  };

  if (payload !== undefined || payload != "" || !payload) {
    response.data = payload;
  }
  return res.status(status).json(response);
};

export default createResponse;
