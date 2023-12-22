const appointmentModel = require('../../../DB/models/appointment.model');
const doctorModel = require('../../../DB/models/doctor.model');
const patientModel = require('../../../DB/models/patient.model');


const takeAppointment = async (req, res) => {
    try {
        const { date, patientId, doctorId } = req.body;

        // Check doctor and patient existence
        const doctor = await doctorModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const patient = await patientModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Create new appointment
        const appointment = new appointmentModel({ date, patientId, doctorId });
        await appointment.save();
        res.status(201).json(appointment);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const modifyAppointment = async (req, res) => {
    try {
        const { date, patientId, doctorId } = req.body;
        const { _id } = req.authUser;
        // Check updated doctor existence if provided
        const doctor = await doctorModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const patient = await patientModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // check patient authorization
        const existAppointment = await appointmentModel.findById(req.params.id)
        if (_id !== existAppointment.patientId.toString()){
            return res.status(404).json({message: "Unauthorized"})
        }

        // Find and update appointment
        const appointment = await appointmentModel
        .findByIdAndUpdate(req.params.id, { date, patientId, doctorId }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }


        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { _id } = req.authUser;
        const existAppointment = await appointmentModel.findById(req.params.id);
        if (_id !== existAppointment.patientId.toString()) {
            return res.status(404).json({message: "Unauthorized"})
        }

        const appointment = await appointmentModel.findByIdAndDelete(req.params.id);
        if(!existAppointment) {
            return res.status(404).json({message: "Appointmet Not Found"})
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find().populate(['doctorId', 'patientId']);
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAppointmentsById = async (req, res) => {
    try {
        // Check Appoinment exist
        const appointment = await appointmentModel.findById(req.params.id).populate(['patientId','doctorId']);
        if(!appointment){
            return res.status(404).json({message: "Appointment Not Found"});
        }

        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


module.exports = {
    takeAppointment,
    modifyAppointment,
    deleteAppointment,
    getAllAppointments,
    getAppointmentsById
}