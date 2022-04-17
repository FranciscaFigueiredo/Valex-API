export type TransactionTypes =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export interface Card {
  id: number;
  employeeId: number;
  number: string;
  cardholderName: string;
  securityCode: string;
  expirationDate: string;
  password?: string;
  isVirtual: boolean;
  originalCardId?: number;
  isBlocked: boolean;
  type: TransactionTypes;
}

export type CardInsertData = Omit<Card, "id">;
export type CardUpdateData = Partial<Card>;

export interface InfoCardInterface {
    employeeId: number,
    type: TransactionTypes,
};

export interface CardValuesUpdate {
    object: object,
    offset: number,
};

export interface ActivateCardData {
    employeeId: number,
    number: string,
    cvc: string,
    password: string,
};
