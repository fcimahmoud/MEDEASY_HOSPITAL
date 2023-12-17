const jwt = require ("jsonwebtoken");
const patientModel = require ("../../DB/models/patient.model");
const doctorModel = require("../../DB/models/doctor.model");

const isAuthenticated = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(400).json({ message: 'Please login first' })
            }

            if (!authorization.startsWith('user')) {
                return res.status(400).json({ message: 'Invalid token prefix' })
            }

            const token = authorization.split(' ')[1];
            const decodedData = jwt.verify(token, process.env.SIGN_IN_TOKEN_SECRET);
            if (!decodedData || !decodedData._id){
                return res.status(400).json({ message: 'invalid token' })
            }

            const patient = await patientModel.findById(decodedData._id)
            const doctor = await doctorModel.findById(decodedData._id)
            if (!patient && !doctor) {
                return res.status(400).json({ message: "You don't have an account" })
            }

            req.authUser = decodedData;
            next();
        }catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else if (error.name === 'TokenBlacklistedError') {
                return res.status(401).json({ message: 'Token blacklisted' });
            } else {
                next(error); // Pass other errors to error handler
            }
        }
    }
}


module.exports = {
    isAuthenticated
}