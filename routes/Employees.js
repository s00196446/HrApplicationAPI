const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')

//Get All
router.get('/', async (req, res) => {
    try{
        const employees = await Employee.find()
        res.json(employees)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Get By Id
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee)
})

//Create
router.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        day: req.body.day
    })

    try{
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})
//Update
router.patch('/id', getEmployee,(req, res) => {

})
//Delete
router.get('/:id', getEmployee,(req, res) => {

})

//Middeware to deal with getting Employee
async function getEmployee(req, res, next){
    try{
        employee = await Employee.findById(req.params.id)
        if (employee == null){
            return res.status(404).json({message: 'Cannot find Employee'})
        }
    }catch (err){
        return res.status(500).json ({message: err.message})
    }
    res.employee = employee
    next()
}

module.exports = router

