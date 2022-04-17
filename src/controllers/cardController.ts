import { Request, Response } from "express";
import { ActivateCardData, InfoCardInterface } from "../interfaces/Card";
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
        cvc,
        password,
    }: ActivateCardData = req.body;

    const { id } = req.params;

    await cardService.activateCard({ id: Number(id), cvc, password });

    return res.sendStatus(200);
}

async function getCardData(req: Request, res: Response) {
    const { id } = req.params;

    const cardDetails = await cardService.findCardDetails(Number(id));

    return res.send(cardDetails);
}

async function blockCard(req: Request, res: Response) {
    const {
        password,
    } = req.body;

    const { id } = req.params;

    await cardService.blockCard(Number(id), password);

    return res.sendStatus(200);
}

export {
    postCard,
    unlockCard,
    getCardData,
    blockCard,
};
