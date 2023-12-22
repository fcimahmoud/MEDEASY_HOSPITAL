const Router = require('express');
const router = Router();
const Doctor = require('./doctor.controller');
const { isAuthenticated } = require ("../../middlewares/Authentication");
const { isValidated } = require('../../middlewares/valdation');
const { loginSchema, checkScheduleSchema, displayProfileSchema, 
        addDoctorSchema, updateDoctorSchema, deleteDoctorSchema, 
        getDoctorsInDepartmentSchema, getPrescriptionsDoctorSchema } = require('./doctor.validationSchemas');

router.post('/login', isValidated(loginSchema), Doctor.login);      // Doctor Login
router.get('/appointment/:id', isValidated(checkScheduleSchema), isAuthenticated(), Doctor.checkSchedule);   // Check his Schedule
router.get('/:id', isValidated(displayProfileSchema), Doctor.displayProfile);    // Display Doctor Profile

router.post('/', isValidated(addDoctorSchema), Doctor.addDoctor);
router.put('/:id', isValidated(updateDoctorSchema), Doctor.updateDoctor);
router.delete('/:id', isValidated(deleteDoctorSchema), Doctor.deleteDoctorById);
router.get('/', Doctor.getAllDoctors);
router.get('/department/:id', isValidated(getDoctorsInDepartmentSchema), Doctor.getDoctorsInDepartment);
router.get('/prescription/:id', isValidated(getPrescriptionsDoctorSchema), Doctor.getPrescriptionsDoctor);


module.exports = router