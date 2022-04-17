import { TransactionTypes } from "../repositories/cardRepository";

export interface PostCardInterface {
    type: TransactionTypes,
};

export interface InfoCardInterface {
    employeeId: number,
    type: TransactionTypes,
};
