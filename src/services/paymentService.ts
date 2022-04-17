import ForbiddenError from '../errors/ForbiddenError';
import NotFoundError from '../errors/NotFoundError';
import { PaymentInsertData } from "../interfaces/Payment";
import * as businessRepository from '../repositories/businessRepository';
import { insert } from '../repositories/paymentRepository';
import * as cardUtils from "../utils/cardUtils";

async function newPayment(password: string, paymentData: PaymentInsertData) {
    const {
        cardId,
        businessId,
        amount,
    } = paymentData;

    const card = await cardUtils.registeredCardCheck(cardId);
    await cardUtils.verifyExpirationDate(card.expirationDate);

    await cardUtils.verifyCardPassword(password, card);

    const business = await businessRepository.findById(businessId);

    if (!business) {
        throw new NotFoundError('Business not found!');
    }

    if (business.type !== card.type) {
        throw new ForbiddenError('Type of business not covered by the card!')
    }

    const balance = await cardUtils.findCardBalance(cardId);
    
    if (balance < amount) {
        throw new ForbiddenError('Insufficient funds');
    }

    const payment = await insert({ cardId, businessId, amount });

    return payment;
}

export {
    newPayment,
};
