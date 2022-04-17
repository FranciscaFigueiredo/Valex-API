import dayjs from "dayjs";
import bcrypt from 'bcrypt';
import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import { Card } from "../interfaces/Card";
import * as cardRepository from "../repositories/cardRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";

async function verifyExpirationDate(expirationDate: string): Promise <void> {
    const now = dayjs().format('MM/YY');
    const isExpired = dayjs(now) > dayjs(expirationDate);

    if (isExpired) {
        throw new ForbiddenError('Date expired!');
    }
}

async function registeredCardCheck(id: number): Promise <Card> {
    const card = await cardRepository.findById(id);
    
    if (!card) {
        throw new NotFoundError('Card not found!');
    }

    return card;
}

async function findCardBalance(id: number) {
    const paymentsTotal = await paymentRepository.findPaymentsTotalByCardId(id);
    const rechargesTotal = await rechargeRepository.findRechargesTotalByCardId(id);

    const balance = rechargesTotal - paymentsTotal;

    return balance;
}

async function verifyCardPassword(password: string, card: Card) {    
    const isAuthorized = bcrypt.compareSync(password, card.password);
console.log(isAuthorized);

    if (!isAuthorized) {
        throw new UnauthorizedError('Invalid password, please try again')
    }
}

export {
    verifyExpirationDate,
    registeredCardCheck,
    findCardBalance,
    verifyCardPassword,
};
