const Router = require('express');
const router = Router();
const Doctor = require('./doctor.controller');
const { isAuthenticated } = require ("../../middlewares/Authentication")

router.post('/login', Doctor.login);      // Doctor Login
router.get('/appointment/:id', isAuthenticated(), Doctor.checkSchedule);   // Check his Schedule
router.get('/:id', Doctor.displayProfile);    // Display Doctor Profile

router.post('/', Doctor.addDoctor);
router.put('/:id', Doctor.updateDoctor);
router.delete('/:id', Doctor.deleteDoctorById);
router.get('/',Doctor.getAllDoctors);
router.get('/department/:id', Doctor.getDoctorsInDepartment);
router.get('/prescription/:id', Doctor.getPrescriptionsDoctor);


module.exports = router