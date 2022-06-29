const User = require('../models/User');
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const sendJwtToClient = require("../helpers/authorization/sendJwtToClient");

const register = asyncErrorWrapper(async(req,res,next) =>
{
    // POST DATA

    const {name,email,password,role} = req.body;

    const user = await User.create({
        name : name,
        email : email,
        password : password,
        role :role
    });
    
    sendJwtToClient(user,res);
});

const errorTest = (req,res,next)=>
{
    //Some Code

    //Question Does Not Exist

    return next(new CustomError("Bir Custom HATATA!!"));
    //Some Code
};

module.exports = {
    register,
    errorTest
};