const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");
config();


const app = express();
const port = process.env.PORT || 5000
const { connectionDB } = require("./DB/connection");
const patientRouter = require("./src/modules/patients/patient.routes");
const doctorRouter = require("./src/modules/doctors/doctor.routes");
const departmentRouter = require("./src/modules/departments/department.routes");
const appoinmentRouter = require("./src/modules/appointments/appointment.routes");
const prescriptionRouter = require("./src/modules/prescriptions/prescription.routes");


connectionDB();
app.use(cors());  
app.use(express.json())
app.use('/patient', patientRouter)
app.use('/doctor', doctorRouter)
app.use('/department', departmentRouter)
app.use('/appoinment', appoinmentRouter)
app.use('/prescription', prescriptionRouter)


app.listen(port, () => {
  console.log('Server is running ..!');
})