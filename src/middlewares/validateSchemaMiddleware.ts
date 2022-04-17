import { NextFunction, Request, Response } from "express";
import Joi, { string } from "joi";
import BodyError from "../errors/BodyError";

export function validateSchemaMiddleware(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation: Joi.ValidationResult = schema.validate(req.body, { abortEarly: false });
    console.log(validation);
	
    if (validation.error) {
      throw new BodyError(validation.error.message);
    }

    next();
  };
}
