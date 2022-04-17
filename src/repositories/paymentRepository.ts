import { connection } from "../database";
import * as paymentInterface from "../interfaces/paymentInterface";

export async function findPaymentsTotalByCardId(cardId: number) {
  const result = await connection.query(
    `SELECT 
      SUM(payments.amount) AS "paymentsTotal"
     FROM payments
     WHERE payments."cardId"=$1;
    `,
    [cardId]
  );

  return result.rows[0].paymentsTotal;
}

export async function findByCardId(cardId: number) {
  const result = await connection.query<paymentInterface.PaymentWithBusinessName, [number]>(
    `SELECT 
      payments.*,
      businesses.name as "businessName"
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
     WHERE "cardId"=$1
    `,
    [cardId]
  );

  return result.rows;
}

export async function insert(paymentData: paymentInterface.PaymentInsertData) {
  const { cardId, businessId, amount } = paymentData;

  const payment = await connection.query<any, [number, number, number]>(
    `INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3) RETURNING *`,
    [cardId, businessId, amount]
  );

  return payment.rows;
}
