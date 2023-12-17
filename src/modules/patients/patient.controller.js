const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../../../DB/models/appointment.model");
const patientModel = require("../../../DB/models/patient.model");
const prescriptionModel = require("../../../DB/models/prescription.model");



const register = async (req, res) => {
    try {
        const {name, email, password, age, gender, phone, address} = req.body;

        // Validate required fields
        if  (!name || !email || !password || !gender || !age || !phone || !address) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check for existing email (unique constraint)
        const existingPatient = await patientModel.findOne({ email });
        if (existingPatient) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Create and save new patient
        const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        const newPatient = new patientModel({name, email, password: hashedPassword, age, gender, phone, address});
        await newPatient.save();

        res.status(201).json({ patient: newPatient});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check email exist
        const patient = await patientModel.findOne({email});
        if(!patient){
            return res.status(404).json({message: "Invalid email or password"});
        }

        // Confirm Password
        const validPassword = bcrypt.compareSync(password, patient.password);
        if(!validPassword) {
            return res.status(404).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({email , _id: patient._id}, process.env.SIGN_IN_TOKEN_SECRET)
        res.status(200).json({message: 'LogIn Successfully', token});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const displayProfile = async (req, res) => {
    try {
        const { _id } = req.authUser;
        if (_id !== req.params.id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Get Patient object
        const patient = await patientModel.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Return patient object
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {name, email, password, age, gender, phone, address} = req.body;
        const {_id} = req.authUser;

        const userExists = await patientModel.findById(req.params.id)
        if (!userExists) {
            return res.status(400).json({ message: 'in-valid patientId' })
        }

        // Check Authorization
        if (userExists._id.toString() !== _id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        // Check for email update and potential conflict if provided
        if (email && email !== userExists.email) {
            const existingPatient = await patientModel.findOne({ email });
            if (existingPatient) {
                return res.status(409).json({ message: 'Email already exists' });
            }
        }

        // Find patient by ID
        const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        const patient = await patientModel
        .findByIdAndUpdate(req.params.id, {name, email, password: hashedPassword, age, gender, phone, address}, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const {_id} = req.authUser;

        // Check if patient exist 
        const patient = await patientModel.findById(req.params.id);
        if(!patient){
            res.status(404).json({message: "Patient Not Found"});
        }

        // Check Authorization
        if (patient._id.toString() !== _id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        // Delete patient and return status code
        await patientModel.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "Account deleted successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await patientModel.find({});
        res.status(200).json(patients);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAppointmentsPatient = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ patientId: req.params.id }).populate('doctorId');
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this patient' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPrescriptionsPatient = async (req, res) => {
    try {
        const prescriptions = await prescriptionModel.find({ patientId: req.params.id }).populate(['doctorId']);
        if (!prescriptions.length) {
            return res.status(404).json({ message: 'No prescriptions found for this patient' });
        }
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    login,
    register,
    displayProfile,
    updateProfile,
    deleteAccount,

    getAllPatients,
    getAppointmentsPatient,
    getPrescriptionsPatient,
}