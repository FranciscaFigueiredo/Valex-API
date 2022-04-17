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
        number,
        cvc,
        password,
    }: ActivateCardData = req.body;

    const { id } = req.params;

    await cardService.activateCard({ id: Number(id), number, cvc, password });

    return res.sendStatus(200);
}

async function getCardData(req: Request, res: Response) {
    const { id } = req.params;

    const cardDetails = await cardService.findCardDetails(Number(id));

    return res.send(cardDetails);
}

export {
    postCard,
    unlockCard,
    getCardData,
};
