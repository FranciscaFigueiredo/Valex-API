import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import BodyError from "../errors/BodyError";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";

export default async function serverMiddlewareError(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
	console.log(error);

	if (error instanceof BodyError) {
		return res.status(400).send(error.message);
	}

	if (error instanceof UnauthorizedError) {
		return res.status(401).send(error.message);
	}

	if (error instanceof NotFoundError) {
		return res.status(404).send(error.message);
	}

	if (error instanceof ConflictError) {
		return res.status(409).send(error.message);
	}

	return res.sendStatus(500);
}
