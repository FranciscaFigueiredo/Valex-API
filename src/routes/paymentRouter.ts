import { Router } from "express";
import * as paymentController from "../controllers/paymentController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { paymentSchema } from "../schemas/paymentSchema";

const router = Router();

router.post('/cards/:id/payment', validateSchemaMiddleware(paymentSchema), paymentController.postPayment);

export default router;
