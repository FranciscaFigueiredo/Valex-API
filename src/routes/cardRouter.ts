import { Router } from 'express';
import * as cardController from '../controllers/cardController';
import { apiKeyValidationMiddleware } from '../middlewares/apiKeyValidationMiddleware';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { activateSchema, lockSchema, typeSchema } from '../schemas/cardSchema';

const router = Router();

router.post('/cards', apiKeyValidationMiddleware, validateSchemaMiddleware(typeSchema), cardController.postCard);
router.put('/cards/:id', validateSchemaMiddleware(activateSchema), cardController.activateCard);
router.get('/cards/:id', cardController.getCardData);
router.post('/cards/:id/lock', validateSchemaMiddleware(lockSchema), cardController.blockCard);
router.post('/cards/:id/unlock', validateSchemaMiddleware(lockSchema), cardController.unlockCard);

export default router;
