import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import NotFoundError from '../errors/NotFoundError';
import * as cardInterface from '../interfaces/Card';
import * as cardRepository from '../repositories/cardRepository';
import * as employeeRepository from '../repositories/employeeRepository';
import ConflictError from '../errors/ConflictError';
import { EmployeeName } from '../interfaces/Employee';
import UnauthorizedError from '../errors/UnauthorizedError';
import * as paymentRepository from '../repositories/paymentRepository';
import * as rechargeRepository from '../repositories/rechargeRepository';
import * as cardUtils from '../utils/cardUtils';
import ForbiddenError from '../errors/ForbiddenError';
import { PaymentWithBusinessName } from '../interfaces/Payment';
import { Recharge } from '../interfaces/Recharge';

async function activateCard({
    id,
    cvc,
    password,
}: cardInterface.ActivateCardData): Promise<boolean> {
    const card = await cardUtils.registeredCardCheck(id);

    if (card.password) {
        throw new ConflictError('Card already unlocked!');
    }

    await cardUtils.verifyExpirationDate(card.expirationDate);

    const isAuthorized = bcrypt.compareSync(cvc, card.securityCode);

    if (!isAuthorized) {
        throw new UnauthorizedError('Incorrect code!');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await cardRepository.update(id, { password: hashedPassword, isBlocked: false });

    return true;
}

async function findCardDetails(id: number): Promise<{
    balance: number,
    transactions: PaymentWithBusinessName[],
    recharges: Recharge[],
}> {
    await cardUtils.registeredCardCheck(id);

    const paymentsTotal = await paymentRepository.findPaymentsTotalByCardId(id);
    const rechargesTotal = await rechargeRepository.findRechargesTotalByCardId(id);

    const balance = rechargesTotal - paymentsTotal;

    const transactions = await paymentRepository.findByCardId(id);
    const recharges = await rechargeRepository.findByCardId(id);

    return {
        balance,
        transactions,
        recharges,
    };
}

async function lockUnlockCard(id: number, password: string, type: string): Promise<boolean> {
    const card = await cardUtils.registeredCardCheck(id);

    await cardUtils.verifyCardPassword(password, card);

    if (type === 'lock' && card.isBlocked) {
        throw new ForbiddenError('Card already blocked!');
    }

    if (type === 'unlock' && !card.isBlocked) {
        throw new ForbiddenError('Card already unlocked!');
    }

    await cardUtils.verifyExpirationDate(card.expirationDate);

    await cardRepository.update(id, { isBlocked: !card.isBlocked });

    return true;
}

async function createCardholderName(fullName: string): Promise<string> {
    const arr = fullName.split(' ');

    let cardholderName = '';

    arr.forEach((name, index) => {
        if (name.length > 2 && (index === 0 || index === arr.length - 1)) {
            cardholderName += `${name}`;
        } else if (name.length > 2 && (index !== 0 || index !== arr.length - 1)) {
            cardholderName += `${name[0]}`;
        }

        if (name.length > 2 && index !== arr.length - 1) {
            cardholderName += ' ';
        }
    });

    return cardholderName;
}

async function findCardByNumber(number: string): Promise<boolean> {
    const card = await cardRepository.findByCardNumber(number);

    if (card) {
        // eslint-disable-next-line no-use-before-define
        generateCardNumber();
    }
    return false;
}

async function generateCardNumber(): Promise<string> {
    const cardNumber = faker.finance.creditCardNumber('mastercard');

    await findCardByNumber(cardNumber);

    return cardNumber;
}

async function generateSecurityCode(): Promise<string> {
    const securityCode = faker.finance.creditCardCVV();

    const hashedSecurityCode = bcrypt.hashSync(securityCode, 10);

    return hashedSecurityCode;
}

async function generateExpirationDate(): Promise<string> {
    const dateNow = new Date();

    const expirationDate = dayjs(dateNow).add(5, 'year').format('MM/YY');

    return expirationDate;
}

async function verifyTypeOfEmployeeCard({
    type,
    employeeId,
}: cardInterface.InfoCardInterface): Promise<cardInterface.Card> {
    const expirationDate = await cardRepository.findByTypeAndEmployeeId(type, employeeId);

    if (expirationDate) {
        throw new ConflictError(`The user already has a ${type} type card`);
    }

    return expirationDate;
}

async function postNewCard({
    employeeId,
    type,
}: cardInterface.InfoCardInterface): Promise<cardInterface.Card> {
    const employee = await employeeRepository.findById(employeeId);

    if (!employee) {
        throw new NotFoundError('Employee data not found');
    }

    const {
        fullName,
    }: EmployeeName = employee;

    await verifyTypeOfEmployeeCard({ type, employeeId });

    const cardholderName: string = await createCardholderName(fullName);

    const cardNumber: string = await generateCardNumber();

    const securityCode: string = await generateSecurityCode();

    const expirationDate: string = await generateExpirationDate();

    const card = await cardRepository.insert({
        employeeId,
        number: cardNumber,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type,
    });

    return card;
}

export {
    postNewCard,
    activateCard,
    findCardDetails,
    lockUnlockCard,
};
