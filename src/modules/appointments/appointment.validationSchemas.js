const joi = require("joi")
const { generalFeilds } = require("../../middlewares/valdation")


const takeAppointmentSchema = {
    body: joi.object({
        date: joi.date().required(),
        patientId: generalFeilds.id,
        doctorId: generalFeilds.id,
    }).required()
}

const modifyAppointmentSchema = {
    body: joi.object({
        date: joi.date().required(),
        patientId: generalFeilds.id,
        doctorId: generalFeilds.id,
    }),

    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const deleteAppointmentSchema = {
    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const getAppointmentsByIdSchema = {
    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}



module.exports = {
    takeAppointmentSchema,
    modifyAppointmentSchema,
    deleteAppointmentSchema,
    getAppointmentsByIdSchema
}