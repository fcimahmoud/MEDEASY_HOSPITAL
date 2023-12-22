const Router = require('express');
const router = Router();
const Patient = require('./patient.controller');
const { isAuthenticated } = require('../../middlewares/Authentication');
const { isValidated } = require('../../middlewares/valdation');
const { registerSchema, loginSchema, updateProfileSchema, 
        deleteAccountSchema, displayProfileSchema, 
        getAppointmentsPatientSchema, getPrescriptionsPatientSchema } = require('./patient.validationSchemas');

router.post('/register', isValidated(registerSchema), Patient.register);
router.get('/confirmEmail/:token', Patient.confirmEmail);
router.post('/login', isValidated(loginSchema), Patient.login);
router.get('/:id',isValidated(displayProfileSchema), isAuthenticated(), Patient.displayProfile);
router.put('/:id', isValidated(updateProfileSchema), isAuthenticated(), Patient.updateProfile);
router.delete('/:id', isValidated(deleteAccountSchema), isAuthenticated(), Patient.deleteAccount);

router.get('/', Patient.getAllPatients);
router.get('/appointments/:id', isValidated(getAppointmentsPatientSchema), Patient.getAppointmentsPatient);
router.get('/prescription/:id', isValidated(getPrescriptionsPatientSchema), Patient.getPrescriptionsPatient);

module.exports = router;