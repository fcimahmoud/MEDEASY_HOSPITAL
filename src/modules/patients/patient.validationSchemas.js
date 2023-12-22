const joi = require("joi")
const { generalFeilds } = require("../../middlewares/valdation")


const registerSchema = {
    body: joi.object({
        name: joi.string(),
        email: generalFeilds.email,
        password: generalFeilds.password,
        age: joi.number(),
        gender: joi.string(),
        phone: joi.string(),
        address: joi.string()
    })
    .options({presence: 'required'})
    .required()
}

const displayProfileSchema = {
    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const loginSchema = {
    body: joi.object({
        email: generalFeilds.email,
        password: generalFeilds.password,
    })
    .options({presence: 'required'})
    .required()
}

const updateProfileSchema = {
    body: joi.object({
        name: joi.string(),
        email: generalFeilds.email,
        password: generalFeilds.password,
        age: joi.number(),
        gender: joi.string(),
        phone: joi.string(),
        address: joi.string()
    }),

    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const deleteAccountSchema = {
    params: joi.object({
        id: generalFeilds.id,
    })
    .required(),
}

const getAppointmentsPatientSchema = {
    params: joi.object({
        id: generalFeilds.id,
    })
    .required(),
}

const getPrescriptionsPatientSchema = {
    params: joi.object({
        id: generalFeilds.id,
    })
    .required(),
}




module.exports = {
    registerSchema,
    displayProfileSchema,
    loginSchema,
    updateProfileSchema,
    deleteAccountSchema,
    getAppointmentsPatientSchema,
    getPrescriptionsPatientSchema
}