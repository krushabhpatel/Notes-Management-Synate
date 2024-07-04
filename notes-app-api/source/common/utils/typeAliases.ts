import Joi, { string } from "joi";
import { ObjectId } from "mongoose";
export interface requestSchema {
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
}

export interface apiResponse {
  messsge: string;
  data: Array<object> | object;
}
export interface appError {
  status: number;
  isOperational?: boolean;
  message: string;
  stack?: string;
}
export interface environmentVariables {
  NODE_ENV: "production" | "development" | "test";
  PORT: number;
  MONGODB_URL: string;
}
