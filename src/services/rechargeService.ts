import NotFoundError from "../errors/NotFoundError";
import * as cardRepository from "../repositories/cardRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardUtils from "../utils/cardUtils";

async function recharge(id: number, amount: number) {
    const card = await cardRepository.findById(id);

    if (!card) {
        throw new NotFoundError('Card not found!');
    }

    await cardUtils.verifyExpirationDate(card.expirationDate);

    const recharge = await rechargeRepository.insert({ cardId: id, amount});

    return recharge;
}

export {
   recharge,
};
