const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appointmentModel = require('../../../DB/models/appointment.model');
const departmentModel = require('../../../DB/models/department.model');
const doctorModel = require('../../../DB/models/doctor.model');
const prescriptionModel = require('../../../DB/models/prescription.model');

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check email exist
        const doctor = await doctorModel.findOne({email});
        if(!doctor){
            return res.status(404).json({message: "Invalid email or password"});
        }

        // Confirm Password
        const validPassword = bcrypt.compareSync(password, doctor.password);
        if(!validPassword) {
            return res.status(404).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({email , _id: doctor._id}, process.env.SIGN_IN_TOKEN_SECRET)
        res.status(200).json({message: 'LogIn Successfully', token});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const checkSchedule = async (req, res) => {
    try {
        const { _id } = req.authUser;

        const doctor = await doctorModel.findById(req.params.id)
        if (!doctor) {
            return res.status(400).json({ message: 'in-valid doctorId' })
        }
        // check authorization
        if (_id !== doctor._id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const appointments = await appointmentModel.find({ doctorId: req.params.id }).populate('patientId');
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this doctor' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const displayProfile = async (req, res) => {
    try {
        // Get doctor object
        const doctor = await doctorModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Return doctor object
        res.status(200).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addDoctor = async (req, res) => {
    try {
        const {name, email, password, gender, salary, speciality, departmentId} = req.body;

        // Validate required fields
        if (!name || !email || !password || !gender || !salary || !speciality || !departmentId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if email already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Get department exist
        const department = await departmentModel.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // Check if doctor limit is reached
        const existingDoctors = await doctorModel.countDocuments({ departmentId: department._id });
        if (existingDoctors >= department.numOfDoctors) {
            return res.status(409).json({ message: 'Department doctor limit reached' });
        }

        // Create new doctor object
        const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        const newDoctor = new doctorModel({name, email, password: hashedPassword, gender, salary, speciality, departmentId});
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const {name, email, password, gender, salary, speciality, departmentId} = req.body;

        // Check if doctor exists
        const doctor = await doctorModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if email is being changed and already exists
        if (
        req.body.email &&
        req.body.email !== doctor.email &&
        (await doctorModel.findOne({ email: req.body.email }))
        ) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Update doctor object
        const updatedDoctor = await doctorModel.findByIdAndUpdate
        (req.params.id, {name, email, password, gender, salary, speciality, departmentId} , { new: true });
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteDoctorById = async (req, res) => {
    try {
        // Delete doctor and return status code
        const doctor = await doctorModel.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getDoctorsInDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;

        // Fetch doctors associated with the department
        const doctors = await doctorModel.find({ departmentId });

        // Return doctors
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPrescriptionsDoctor = async (req, res) => {
    try {
        const prescriptions = await prescriptionModel.find({ doctorId: req.params.id }).populate(['patientId']);
        if (!prescriptions.length) {
            return res.status(404).json({ message: 'No prescriptions found for this doctor' });
        }
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    login,
    checkSchedule,
    displayProfile,
    addDoctor,
    updateDoctor,
    deleteDoctorById,
    getAllDoctors,
    getDoctorsInDepartment,
    getPrescriptionsDoctor
}
