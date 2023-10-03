// const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// const { genSalt, hash, compare } = bcrypt;

const EmployeeDetailsSchema = new mongoose.Schema({
  empid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  dob: {
    type: String,
    required: true,
  },
});

EmployeeDetailsSchema.methods.isValidPassword = async function (password) {
  try {
    return password === this.password;
  } catch (error) {
    throw error;
  }
};

const EmployeeDetails = mongoose.model("Details", EmployeeDetailsSchema);

module.exports = EmployeeDetails;
