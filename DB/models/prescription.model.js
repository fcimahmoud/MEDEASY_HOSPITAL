const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  medicine:[{
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
  }],
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  }
});

const prescriptionModel = mongoose.model('Prescription', PrescriptionSchema);
module.exports = prescriptionModel;