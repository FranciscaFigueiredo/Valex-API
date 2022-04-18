import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';
import * as companyService from '../services/companyService';

async function apiKeyValidationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const xApiKey = req.headers?.['x-api-key'];

    if (!xApiKey) {
        throw new UnauthorizedError('Invalid API key');
    }

    const companyId = await companyService.findCompany(String(xApiKey));

    res.locals.companyId = companyId;
    return next();
}

export {
    apiKeyValidationMiddleware,
};
