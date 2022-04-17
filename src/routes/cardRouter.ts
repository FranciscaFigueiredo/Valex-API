import { Router } from "express";
import * as cardController from "../controllers/cardController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { activateSchema, typeSchema } from "../schemas/cardSchema";

const router = Router();

router.post('/cards', validateSchemaMiddleware(typeSchema), cardController.postCard);
router.put('/cards', validateSchemaMiddleware(activateSchema), cardController.unlockCard);

export default router;
