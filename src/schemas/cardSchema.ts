import joi from 'joi';

// const financeSchema = joi.object({
//     name: joi.string().min(3).max(30).required(),
//     value: joi.number().integer().min(1).required(),
// });

const typeSchema = joi.object({
    type: joi.string().pattern(/^groceries$|^restaurants$|^transport$|^education$|^health$/),
});

export {
    typeSchema,
};
