const Router = require('express');
const router = Router();
const prescription = require('./prescription.controller')
const { isAuthenticated } = require('../../middlewares/Authentication');

router.post('/', isAuthenticated(), prescription.fillPrescription);

router.put('/:id', prescription.updatePrescription);
router.delete('/:id', prescription.deletePrescription);
router.get('/', prescription.getAllPrescriptions);
router.get('/:id', prescription.getPrescriptionById);

module.exports = router;