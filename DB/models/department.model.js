const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  numOfDoctors: {
    type: Number,
    required: true,
  },
  // managerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Doctor',
  //   required: true,
  // }
});

const departmentModel = mongoose.model('Department', DepartmentSchema);
module.exports = departmentModel;
