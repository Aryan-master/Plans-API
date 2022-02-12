import  * as Joi from 'joi'

export const add_plans_schema = Joi .object().keys({
    plan_id: Joi.number().required(),
    plan_name: Joi.string().required(),
    features: Joi.array().items(Joi.string()),
    price:Joi.number(),
});