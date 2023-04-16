const userModel = require("../models/userModels");
const doctorModels=require("../models/doctorModels");


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
  
  const getAllDoctorsController = async (req, res) => {
    try {
      const doctors = await doctorModels.find({});
      res.status(200).send({
        success: true,
        message: "Doctors Data list",
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while getting doctors data",
        error,
      });
    }
  };

  const changeAccountStatusController = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await doctorModels.findByIdAndUpdate(doctorId, { status });
      const user = await userModel.findOne({ _id: doctor.userId });
      const notifcation = user.notifcation;
      notifcation.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor = status === "approved" || status === "reject" ? true : false;
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
  
module.exports={
    getAllDoctorsController,getAllUsersController,changeAccountStatusController
}