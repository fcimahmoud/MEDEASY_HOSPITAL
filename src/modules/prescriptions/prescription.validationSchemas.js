const joi = require("joi")
const { generalFeilds } = require("../../middlewares/valdation")


const fillPrescriptionSchema = {
    body: joi.object({
        date: joi.date().required(),
        medicine: joi.array().items(
            joi.object({
                name: joi.string().required(),
                dosage: joi.string().required(),
                frequency: joi.string().required()
            })
        ).required(),
        doctorId: generalFeilds.id,
        patientId: generalFeilds.id
    }).required()
}

const updatePrescriptionSchema = {
    body: joi.object({
        date: joi.date(),
        medicine: joi.array().items(
            joi.object({
                name: joi.string(),
                dosage: joi.string(),
                frequency: joi.string()
            })
        ),
        doctorId: generalFeilds.id,
        patientId: generalFeilds.id
    }),

    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const deletePrescriptionSchema = {
    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const getPrescriptionByIdSchema = {
    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}



module.exports = {
    fillPrescriptionSchema,
    updatePrescriptionSchema,
    deletePrescriptionSchema,
    getPrescriptionByIdSchema
}