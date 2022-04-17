import { Request, Response } from "express";
import { PostCardInterface } from "../interfaces/cardInterface";
import * as cardService from "../services/cardService";

async function postCard(req: Request, res: Response) {
    const {
        type,
    }: PostCardInterface = req.body;

    const { id } = req.params;

    const card = await cardService.postNewCard({ employeeId: Number(id), type });

    return res.send(card);
}

export {
    postCard,
};
