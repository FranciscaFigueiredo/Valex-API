import { connection } from "../database";
import { Recharge, RechargeInsertData } from "../interfaces/rechargeInterface";

export async function findByCardId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}

export async function findRechargesTotalByCardId(cardId: number) {
  const result = await connection.query(
    `SELECT 
      SUM(recharges.amount) AS "rechargesTotal"
     FROM recharges
     WHERE recharges."cardId"=$1;
    `,
    [cardId]
  );

  return result.rows[0].rechargesTotal;
}

export async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount]
  );
}
