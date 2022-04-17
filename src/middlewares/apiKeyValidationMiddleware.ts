import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";

async function apiKeyValidationMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const xApiKey = req.headers?.xApiKey;

    if (!xApiKey) {
        throw new UnauthorizedError('Invalid API key');
    }

    res.locals.apiKey = xApiKey;
    return next();
}

export {
    apiKeyValidationMiddleware,
};
