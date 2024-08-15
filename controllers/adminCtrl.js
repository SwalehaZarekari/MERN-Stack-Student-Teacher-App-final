const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");


const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).send({
        success: true,
        message: "users data list",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "erorr while fetching users",
        error,
      });
    }
  };



 const  getAllTeachersController= async (req, res)=>{
      
    try {
        const teachers = await doctorModel.find({});
        res.status(200).send({
          success: true,
          message: "Teachers Data list",
          data: teachers,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while getting Teachers data",
          error,
        });
      }

 }





 const changeAccountStatusController = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
      const user = await userModel.findOne({ _id: doctor.userId });
      const notifcation = user.notifcation;
      notifcation.push({
        type: "Teacher-account-request-updated",
        message: `Your Teacher Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor = status === "approved" ? true : false;

      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
  };
  



 module.exports = { getAllTeachersController, getAllUsersController, changeAccountStatusController  };