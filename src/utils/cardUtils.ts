import dayjs from "dayjs";
import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";
import * as cardRepository from "../repositories/cardRepository";

async function verifyExpirationDate(expirationDate: string) {
    const now = dayjs().format('MM/YY');
    const isExpired = dayjs(now) > dayjs(expirationDate);

    if (isExpired) {
        throw new ForbiddenError('Date expired!');
    }
}

async function registeredCardCheck(id: number) {
    const card = cardRepository.findById(id);

    if (!card) {
        throw new NotFoundError('Card not found!');
    }

    return card;
}

export {
    verifyExpirationDate,
    registeredCardCheck,
};
