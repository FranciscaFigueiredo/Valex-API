import { Request, Response } from "express";
import { ActivateCardData, InfoCardInterface } from "../interfaces/cardInterface";
import * as cardService from "../services/cardService";

async function postCard(req: Request, res: Response) {
    const {
        employeeId,
        type,
    }: InfoCardInterface = req.body;

    const card = await cardService.postNewCard({ employeeId, type });

    return res.send(card);
}

async function unlockCard(req: Request, res: Response) {
    const {
        employeeId,
        number,
        cvc,
        password,
    }: ActivateCardData = req.body;

    await cardService.activateCard({ employeeId, number, cvc, password });

    return res.sendStatus(200);
}

export {
    postCard,
    unlockCard,
};
