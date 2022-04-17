import { Router } from "express";
import * as paymentController from "../controllers/paymentController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { amountSchema } from "../schemas/rechargeSchema";

const router = Router();

router.post('/cards/:id/payment', validateSchemaMiddleware(amountSchema), paymentController.postPayment);

export default router;
