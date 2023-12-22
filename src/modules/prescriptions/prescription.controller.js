const prescriptionModel = require('../../../DB/models/prescription.model')
const doctorModel = require('../../../DB/models/doctor.model');
const patientModel = require("../../../DB/models/patient.model");



const fillPrescription = async (req, res) => {
    try {
        const { date, medicine, doctorId, patientId } = req.body;
        const { _id } = req.authUser;

        // // Validate required fields
        // if (!date || !medicine || !doctorId || !patientId) {
        //     return res.status(400).json({ message: 'Missing required fields' });
        // }

        // // Validate medicine array format
        // if (!Array.isArray(medicine) || !medicine.every(med => med.name && med.dosage && med.frequency)) {
        //     return res.status(400).json({ message: 'Invalid medicine array format' });
        // }

        // Check doctor and patient existence
        const doctor = await doctorModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const patient = await patientModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // check authorization
        if (doctorId.toString() !== _id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        // Create and save new prescription
        const newPrescription = new prescriptionModel({ date, medicine, doctorId, patientId } );
        await newPrescription.save();

        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePrescription = async (req, res) => {
    try {
        const { date, medicine, doctorId, patientId } = req.body;

        // Update fields if provided
        const updatedPrescription = await prescriptionModel
        .findByIdAndUpdate( req.params.id,{ date, medicine, doctorId, patientId } , { new: true });
        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        // // Validate updated medicine array format if provided
        // if (medicine && !Array.isArray(medicine) || !medicine.every(med => med.name && med.dosage && med.frequency)) {
        // return res.status(400).json({ message: 'Invalid medicine array format' });
        // }

        // Check updated doctor and patient existence if provided
        if (doctorId) {
            const doctor = await doctorModel.findById(doctorId);
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
        }
        if (patientId) {
            const patient = await patientModel.findById(patientId);
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
        }
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

const deletePrescription = async (req, res) => {
    try {
        const existPrescription = await prescriptionModel.findByIdAndDelete(req.params.id);
        if(!existPrescription) {
            return res.status(404).json({message: "Prescription Not Found"});
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await prescriptionModel.find().populate(['doctorId', 'patientId']);
        if(!prescriptions) {
            return res.status(404).json({message: "No Prescriptions Found"});
        }
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPrescriptionById = async (req, res) => {
    try {
        const prescription = await prescriptionModel.findById(req.params.id).populate(['doctorId', 'patientId']);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription Not Found' });
        }
        res.status(200).json(prescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    fillPrescription,
    updatePrescription,
    deletePrescription,
    getAllPrescriptions,
    getPrescriptionById,
}