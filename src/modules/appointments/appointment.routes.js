const Router = require('express');
const router = Router();
const Appointment = require('./appointment.controller')
const { isAuthenticated } = require ("../../middlewares/Authentication");
const { isValidated } = require('../../middlewares/valdation');
const { takeAppointmentSchema, modifyAppointmentSchema, 
        deleteAppointmentSchema, getAppointmentsByIdSchema } = require('./appointment.validationSchemas');

router.post('/', isValidated(takeAppointmentSchema), isAuthenticated(), Appointment.takeAppointment);  // Take an Appointment
router.put('/:id', isValidated(modifyAppointmentSchema), isAuthenticated(), Appointment.modifyAppointment);  // Modify an Appointment
router.delete('/:id', isValidated(deleteAppointmentSchema), isAuthenticated(), Appointment.deleteAppointment); // Delete an Appointment
router.get('/', Appointment.getAllAppointments);
router.get('/:id', isValidated(getAppointmentsByIdSchema), Appointment.getAppointmentsById);


module.exports = router