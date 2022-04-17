import { Request, Response } from "express";
import { PaymentBodyData } from "../interfaces/paymentInterface";
import * as paymentService from "../services/paymentService";

async function postPayment(req: Request, res: Response) {
    const {
        password,
        businessId,
        amount,
    }: PaymentBodyData = req.body;

    const { id } = req.params;

    const payment = await paymentService.newPayment(
        password,
        {
            cardId: Number(id),
            businessId,
            amount,
        }
    )

    return res.send(payment);
}

export {
    postPayment,
};
