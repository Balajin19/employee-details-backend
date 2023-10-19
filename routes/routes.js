const express = require("express");
const EmployeeDetails = require("../models/details");
const router = express.Router();
const createError = require("http-errors");

router.get("/", (req, res) => {
  const employeesData = {
    message: "Welcome to Employees Data endpoint!",
  };
  res.json(employeesData);
});

router.get("/getAllEmployees", async (req, res) => {
  let emp = await EmployeeDetails.find();
  res.json(emp);
});
router.get( "/search", async( req, res ) =>
{
  let empid = req.query.q;
  let emp = await EmployeeDetails.findOne( { empid } );
  res.json(emp);
});

router.get( "/employee/:id", async ( req, res ) =>
{
  const empid = req.params.id;
  let emp = await EmployeeDetails.findOne({ empid });
  res.json(emp);
});

router.post("/addEmployee", async (req, res, next) => {
  try
  {
    const { empid, name, dob, email } = req.body;
    let userExist = await EmployeeDetails.findOne( { empid } );
    if (userExist) throw new Error(`${empid} Employee ID already exists!`);
    const employee = new EmployeeDetails({
      empid,
      name,
      dob,
      email,
    });
    const addedEmp = await employee.save();
    let allEmp = await EmployeeDetails.find();
    res.send(allEmp);
  } catch ( error )
  {
    console.log(error,"error");
    next(error);
  }
});

router.patch("/updateEmployee/:id", async (req, res, next) => {
  try {  
    let empid = req.params.id;
    let updateEmp = await EmployeeDetails.findOne({ empid });
    let _id = updateEmp._id;
    let emp = await EmployeeDetails.findOneAndUpdate({ _id }, req.body);
    let allEmp = await EmployeeDetails.find();
    res.send(allEmp);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete-employee/:id", async (req, res) => {
  let _id = req.params.id;
  let emp = await EmployeeDetails.findOneAndDelete({ _id });
  let allEmp = await EmployeeDetails.find();
  res.send(allEmp);
});
module.exports = router;
