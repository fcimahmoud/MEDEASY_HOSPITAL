const joi = require("joi")
const { generalFeilds } = require("../../middlewares/valdation")

const loginSchema = {
    body: joi.object({
        email: generalFeilds.email,
        password: generalFeilds.password,
    })
    .required()
}

const checkScheduleSchema = {
    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const displayProfileSchema = {
    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const addDoctorSchema = {
    body: joi.object({
        name: joi.string(),
        email: generalFeilds.email,
        password: generalFeilds.password,
        salary: joi.number(),
        gender: joi.string(),
        speciality: joi.string(),
        departmentId: generalFeilds.id,
    })
    .options({presence: 'required'})
    .required()
}

const updateDoctorSchema = {
    body: joi.object({
        name: joi.string(),
        email: generalFeilds.email,
        password: generalFeilds.password,
        salary: joi.number(),
        gender: joi.string(),
        speciality: joi.string(),
        departmentId: generalFeilds.id,
    }),

    params: joi.object({
        id: generalFeilds.id,
    }).required(),
}

const deleteDoctorSchema = {
    params: joi.object({
        id: generalFeilds.id,
    })
    .required(),
}

const getDoctorsInDepartmentSchema = {
    params: joi.object({
        id: generalFeilds.id,
    })
    .required(),
}

const getPrescriptionsDoctorSchema = {
    params: joi.object({
        id: generalFeilds.id,
    })
    .required(),
}



module.exports = {
    loginSchema,
    checkScheduleSchema,
    displayProfileSchema,

    addDoctorSchema,
    updateDoctorSchema,
    deleteDoctorSchema,
    getDoctorsInDepartmentSchema,
    getPrescriptionsDoctorSchema
}