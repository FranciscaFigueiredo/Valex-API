import joi from 'joi';

const typeSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi.string().pattern(/^groceries$|^restaurants$|^transport$|^education$|^health$/),
});

const activateSchema = joi.object({
    employeeId: joi.number().required(),
    number: joi.string().required(),
    cvc: joi.number().min(100).max(999),
    password: joi.number().min(1000).max(9999),
});

export {
    typeSchema,
    activateSchema,
};
