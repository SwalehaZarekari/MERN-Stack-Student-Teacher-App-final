const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");

const getTeacherInfoController=async (req, res)=>{

    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({
          success: true,
          message: "Teacher data fetch success",
          data: doctor,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Fetching Teacher Details",
        });
      }
}

const updateProfileController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOneAndUpdate(
        { userId: req.body.userId },
        req.body
      );
      res.status(201).send({
        success: true,
        message: "Teacher Profile Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Teacher Profile Update issue",
        error,
      });
    }
  };
  
  
const teacherAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Teacher Appointment fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Teacher Appointments",
    });
  }
};
 




const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/teacher-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};





module.exports = { getTeacherInfoController , updateProfileController , teacherAppointmentsController,updateStatusController}