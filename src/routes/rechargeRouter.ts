import { Router } from "express";
import * as rechargeController from "../controllers/rechargeController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { amountSchema } from "../schemas/rechargeSchema";

const router = Router();

router.post('/cards/:id/recharge', validateSchemaMiddleware(amountSchema), rechargeController.postRecharge);

export default router;
