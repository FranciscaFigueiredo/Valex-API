import { connection } from "../database";
import * as Card from "../interfaces/Card";
import { mapObjectToUpdateQuery } from "../utils/sqlUtils";

export async function find() {
  const result = await connection.query<Card.Card>("SELECT * FROM cards");
  return result.rows;
}

export async function findById(id: number) {
  const result = await connection.query<Card.Card, [number]>(
    "SELECT * FROM cards WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export async function findByTypeAndEmployeeId(
  type: Card.TransactionTypes,
  employeeId: number
) {
  const result = await connection.query<Card.Card, [Card.TransactionTypes, number]>(
    `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
    [type, employeeId]
  );

  return result.rows[0];
}

export async function findByCardDetails(
  number: string,
  cardholderName: string,
  expirationDate: string
) {
  const result = await connection.query<Card.Card, [string, string, string]>(
    ` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
    [number, cardholderName, expirationDate]
  );

  return result.rows[0];
}

export async function findByCardNumber(number: string) {
  const result = await connection.query<Card.Card, [string]>(
    ` SELECT 
        * 
      FROM cards 
      WHERE number=$1;`,
    [number]
  );

  return result.rows[0];
}

export async function insert(cardData: Card.CardInsertData) {
  const {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  } = cardData;

  const card = await connection.query(
    `
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `,
    [
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type,
    ]
  );
  return card.rows[0];
}

export async function update(id: number, cardData: Card.CardUpdateData) {
  const { objectColumns: cardColumns, objectValues: cardValues } =
    mapObjectToUpdateQuery({
      object: cardData,
      offset: 2,
    });

  connection.query(
    `
    UPDATE cards
      SET ${cardColumns}
    WHERE $1=id;
  `,
    [id, ...cardValues]
  );
}

export async function remove(id: number) {
  connection.query<any, [number]>("DELETE FROM cards WHERE id=$1", [id]);
}
