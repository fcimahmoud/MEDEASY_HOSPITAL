const departmentModel = require('../../../DB/models/department.model');
const doctorModel = require('../../../DB/models/doctor.model');

const addDepartment = async (req, res) => {
    try {
        const {name, numOfDoctors} = req.body;

        // Check Department Name Exist
        const existingDepartment = await departmentModel.findOne({ name });
        if (existingDepartment) {
            return res.status(409).json({ message: 'Department name already exists' });
        }

        const newDepartment = new departmentModel({name, numOfDoctors});
        await newDepartment.save();
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const {name, numOfDoctors} = req.body;
        const department = await departmentModel.findOne({ name: req.params.name });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        if (name && name !== department.name) {
            const existingDepartment = await departmentModel.findOne({ name });
            if (existingDepartment) {
                return res.status(409).json({ message: 'Department name already exists' });
            }
        }

        department.set({name, numOfDoctors});
        await department.save();
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteDepartmentById = async (req, res) => {
    try {
        const department = await departmentModel.findByIdAndDelete(req.params.id);
        if (!department) {
            res.status(404).json({ message: 'Department not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.find({});
        res.status(200).json(departments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getDepartmentId = async (req, res) => {
    try {
        const department = await departmentModel.findById(req.params.id);
        if(!department) {
            return res.status(404).json({message: "Departmet Not Found"});
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    addDepartment,
    updateDepartment,
    deleteDepartmentById,
    getAllDepartments,
    getDepartmentId
}
