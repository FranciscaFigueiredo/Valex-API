import { Router } from 'express';
import * as rechargeController from '../controllers/rechargeController';
import { apiKeyValidationMiddleware } from '../middlewares/apiKeyValidationMiddleware';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { amountSchema } from '../schemas/rechargeSchema';

const router = Router();

router.post('/cards/:id/recharge', apiKeyValidationMiddleware, validateSchemaMiddleware(amountSchema), rechargeController.postRecharge);

export default router;
