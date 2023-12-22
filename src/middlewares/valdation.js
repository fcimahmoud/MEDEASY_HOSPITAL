const joi = require("joi")

const reqMethods = ['body', 'query', 'params', 'headers', 'file', 'files'];
const generalFeilds = {
    email: joi.string().email(),
    password: joi.string().regex(/^[A-Za-z\d@$!%*#?&]{8,}$/)
    .messages({
        'string.pattern.base': 'Password must be contain at least 8 characters',
    }),
    id: joi.string().hex().length(24).required(),
}

const isValidated = (schema) => {
    return (req,res,next) => {
        const validationErrorArr = []
        for (const key of reqMethods) {
            if (schema[key]){
                const validationResult = schema[key].validate(req[key],{abortEarly: false})
                if (validationResult.error){
                    validationErrorArr.push(validationResult.error.details)
                }
            }
        }

        if(validationErrorArr.length){
            return res.status(400).json({ Errors: validationErrorArr })
        }

        next()
    }
}

module.exports = {
    isValidated,
    generalFeilds
}