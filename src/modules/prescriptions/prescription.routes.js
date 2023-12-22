const Router = require('express');
const router = Router();
const prescription = require('./prescription.controller')
const { isAuthenticated } = require('../../middlewares/Authentication');
const { isValidated } = require('../../middlewares/valdation');
const { fillPrescriptionSchema, updatePrescriptionSchema, 
        deletePrescriptionSchema, getPrescriptionByIdSchema } = require('./prescription.validationSchemas');

router.post('/', isValidated(fillPrescriptionSchema), isAuthenticated(), prescription.fillPrescription);

router.put('/:id', isValidated(updatePrescriptionSchema), prescription.updatePrescription);
router.delete('/:id', isValidated(deletePrescriptionSchema), prescription.deletePrescription);
router.get('/', prescription.getAllPrescriptions);
router.get('/:id', isValidated(getPrescriptionByIdSchema), prescription.getPrescriptionById);

module.exports = router;