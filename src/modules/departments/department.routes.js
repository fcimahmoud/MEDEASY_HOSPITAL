const Router = require('express');
const router = Router();
const Department = require('./department.controller');

router.post('/', Department.addDepartment);
router.put('/:name',Department.updateDepartment);
router.delete('/:id', Department.deleteDepartmentById);
router.get('/', Department.getAllDepartments);  // Display Departments
router.get('/:id', Department.getDepartmentId);


module.exports = router