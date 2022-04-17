import joi from 'joi';

const amountSchema = joi.object({
    amount: joi.number().min(1),
});

export {
    amountSchema,
};
