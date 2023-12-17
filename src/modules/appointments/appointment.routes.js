const Router = require('express');
const router = Router();
const Appointment = require('./appointment.controller')
const { isAuthenticated } = require ("../../middlewares/Authentication")

router.post('/', isAuthenticated(), Appointment.takeAppointment);  // Take an Appointment
router.put('/:id', isAuthenticated(), Appointment.modifyAppointment);  // Modify an Appointment
router.delete('/:id', isAuthenticated(), Appointment.deleteAppointment); // Delete an Appointment
router.get('/', Appointment.getAllAppointments);
router.get('/:id', Appointment.getAppointmentsById);


module.exports = router