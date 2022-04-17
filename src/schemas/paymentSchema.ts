import joi from 'joi';

const paymentSchema = joi.object({
    password: joi.number().min(1000).max(9999),
    businessId: joi.number(),
    amount: joi.number().min(1),
});

export {
    paymentSchema,
};
