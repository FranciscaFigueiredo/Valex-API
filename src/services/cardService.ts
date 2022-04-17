import NotFoundError from "../errors/NotFoundError";
import * as cardInterface from "../interfaces/cardInterface";
import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import ConflictError from "../errors/ConflictError";
import { EmployeeName } from "../interfaces/employeeInterface";
import UnauthorizedError from "../errors/UnauthorizedError";

async function postNewCard({ employeeId, type }: cardInterface.InfoCardInterface) {

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

async function activateCard({ employeeId, number, cvc, password }: cardInterface.ActivateCardData): Promise<boolean> {
    const card = await cardRepository.findByCardNumber(number);
    
    if (!card) {
        throw new NotFoundError('')
    }

    const isAuthorized = bcrypt.compareSync(cvc, card.securityCode);

    if (!isAuthorized) {
        throw new UnauthorizedError('');
    }    

    const hashedPassword = bcrypt.hashSync(password, 10);

    await cardRepository.update(employeeId, {password: hashedPassword});

    return true;
}

async function findCardByNumber(number: string): Promise<boolean> {
    const card = await cardRepository.findByCardNumber(number);

    if (card) {
        generateCardNumber();
    }
    return false;
}

async function createCardholderName(fullName: string): Promise<string> {
    const arr = fullName.split(' ');

    let cardholderName = '';

    arr.forEach((name, index) => {
        if (name.length > 2 && (index === 0 || index === arr.length - 1)) {
            cardholderName += `${name}`
        } else if (name.length > 2 && (index !== 0 || index !== arr.length - 1)) {
            cardholderName += `${name[0]}`
        }
        
        if (name.length > 2 && index !== arr.length - 1) {
            cardholderName += ' ';
        }
    })

    return cardholderName;
}

async function generateCardNumber(): Promise<string> {
    const cardNumber = faker.finance.creditCardNumber('mastercard');

    await findCardByNumber(cardNumber);

    return cardNumber;
}

async function generateSecurityCode(): Promise<string> {
    const securityCode = faker.finance.creditCardCVV();
    console.log(securityCode);
    
    const hashedSecurityCode = bcrypt.hashSync(securityCode, 10);

    return hashedSecurityCode;
}

async function generateExpirationDate(): Promise<string> {
    const dateNow = new Date();

    const expirationDate = dayjs(dateNow).add(5, 'year').format('MM/YY');
    
    return expirationDate;
}

async function verifyTypeOfEmployeeCard({ type, employeeId }: cardInterface.InfoCardInterface): Promise<cardInterface.Card> {
    const expirationDate = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    
    if (expirationDate) {
        throw new ConflictError(`The user already has a ${type} type card`);
    }

    return expirationDate;
}

export {
    postNewCard,
    activateCard,
};
