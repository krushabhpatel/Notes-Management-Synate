/**
 * Imports Request, Response, and NextFunction from the "express" library
 * and apiResponse from the "./typeAliases" file.
 */
import { Request, Response, NextFunction } from "express";
import { apiResponse } from "./typeAliases";


/**
 * Handles a method not allowed error by sending a 405 status code with an error message.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @returns {Response<apiResponse>} A response object with an error message.
 */
const methodNotAllowed = (req: Request, res:Response, next:NextFunction) : Response<apiResponse> => {
    const errorMessage = (req as any).t('errorMessages.invalidRequestMethod');
    return res.status(405).send({
        "message": errorMessage
    });
};

export default methodNotAllowed;

