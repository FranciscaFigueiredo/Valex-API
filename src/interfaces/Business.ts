import { TransactionTypes } from './Card';

export interface Business {
    id: number;
    name: string;
    type: TransactionTypes;
}
