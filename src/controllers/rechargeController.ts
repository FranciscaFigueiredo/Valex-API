import { Request, Response } from 'express';
import * as rechargeService from '../services/rechargeService';

async function postRecharge(req: Request, res: Response) {
    const { amount } = req.body;

    const { id } = req.params;

    const recharge = await rechargeService.recharge(Number(id), amount);

    return res.send(recharge);
}

export {
    postRecharge,
};
