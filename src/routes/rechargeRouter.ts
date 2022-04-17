import { Router } from "express";
import * as rechargeController from "../controllers/rechargeController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { rechargeSchema } from "../schemas/rechargeSchema";

const router = Router();

router.post('/cards/:id/recharge', validateSchemaMiddleware(rechargeSchema), rechargeController.postRecharge);

export default router;
