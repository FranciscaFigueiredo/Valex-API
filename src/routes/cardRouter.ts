import { Router } from "express";
import * as cardController from "../controllers/cardController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { activateSchema, blockSchema, typeSchema } from "../schemas/cardSchema";

const router = Router();

router.post('/cards', validateSchemaMiddleware(typeSchema), cardController.postCard);
router.put('/cards/:id', validateSchemaMiddleware(activateSchema), cardController.unlockCard);
router.get('/cards/:id', cardController.getCardData);
router.post('/cards/:id/block', validateSchemaMiddleware(blockSchema), cardController.blockCard);

export default router;
