const Router = require('express');
const router = Router();
const Department = require('./department.controller');
const { isValidated } = require('../../middlewares/valdation');
const { addDepartmentSchema, updateDepartmentSchema,
        deleteDepartmentSchema, getDepartmentIdSchema } = require('./department.validationSchemas');

router.post('/', isValidated(addDepartmentSchema), Department.addDepartment);
router.put('/:name', isValidated(updateDepartmentSchema), Department.updateDepartment);
router.delete('/:id', isValidated(deleteDepartmentSchema), Department.deleteDepartmentById);
router.get('/', Department.getAllDepartments);  // Display Departments
router.get('/:id', isValidated(getDepartmentIdSchema), Department.getDepartmentId);


module.exports = router