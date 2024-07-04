/**
 * Imports necessary modules and functions for handling Express requests and responses.
 * @param {Request} req - The request object from Express.
 * @param {Response} res - The response object from Express.
 * @param {NextFunction} next - The next function in the Express middleware chain.
 * @param {Joi} Joi - The Joi validation library.
 * @param {ValidationResult} ValidationResult - The result of a Joi validation.
 * @param {Function} pick - A function from lodash to pick specific properties from an object.
 * @param {requestSchema} requestSchema - Custom type alias for request schema.
 * @param {Function} log - A function to log messages to the console.
 */
import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationResult } from 'joi';
import { pick } from 'lodash';
import { requestSchema } from '../utils/typeAliases';
import { log } from 'console';


/**
 * Middleware function to validate the request object based on the provided schema.
 * @param {any} schema - The schema to validate the request against.
 * @returns A middleware function that validates the request object.
 */
const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema:requestSchema = pick(schema, ['params', 'query', 'body']);
    const object: Partial<Request> = pick(req, Object.keys(validSchema));
    const { value, error }:ValidationResult = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);

        if (error) {
            const { details } = error;
            const messages = details.map((i) => {
              const label = i.context?.label || i.context?.key; // Fallback to the key if label is not available
              const translatedMessage = (req as any).t(`validationMessages.${label}`);
              return translatedMessage || i.message;
        });
 
        return res.status(422).json({
            message: messages.join(','),
          });
        }
      
        Object.assign(req, value);
        return next();
};

export default validate;
