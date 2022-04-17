import { Router } from "express";
import * as cardController from "../controllers/cardController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { typeSchema } from "../schemas/cardSchema";

const router = Router();

router.post('/cards/:id', validateSchemaMiddleware(typeSchema), cardController.postCard);

export default router;
