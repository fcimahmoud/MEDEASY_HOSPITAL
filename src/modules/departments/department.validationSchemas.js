const joi = require("joi")
const { generalFeilds } = require("../../middlewares/valdation")


const addDepartmentSchema = {
    body: joi.object({
        name: joi.string().required(),
        numOfDoctors: joi.number().required()
    }).required()
}

const updateDepartmentSchema = {
    body: joi.object({
        name: joi.string().required(),
        numOfDoctors: joi.number().required()
    }).required(),

    params: joi.object({
        name: joi.string().required()
    })
    .required(),
}

const deleteDepartmentSchema = {
    params: joi.object({
        id: generalFeilds.id,
    })
    .required(),
}

const getDepartmentIdSchema = {
    params: joi.object({
        id: generalFeilds.id,
    })
    .required(),
}


module.exports = {
    addDepartmentSchema,
    updateDepartmentSchema,
    deleteDepartmentSchema,
    getDepartmentIdSchema
}