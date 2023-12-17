const Router = require('express');
const router = Router();
const Patient = require('./patient.controller');
const { isAuthenticated } = require('../../middlewares/Authentication');

router.post('/register', Patient.register);
router.post('/login', Patient.login);
router.get('/:id', isAuthenticated(), Patient.displayProfile);
router.put('/:id', isAuthenticated(), Patient.updateProfile);
router.delete('/:id', isAuthenticated(), Patient.deleteAccount);

router.get('/', Patient.getAllPatients);
router.get('/appoinments/:id', Patient.getAppointmentsPatient);
router.get('/prescription/:id', Patient.getPrescriptionsPatient);

module.exports = router;