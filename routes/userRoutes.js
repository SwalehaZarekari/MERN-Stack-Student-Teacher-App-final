const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllTeachersController,
  bookeAppointmnetController,
  userAppointmentsController
  
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//APply Doctor || POST
router.post("/apply-teacher", authMiddleware, applyDoctorController);

router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);


router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

router.get("/getAllTeachers", authMiddleware, getAllTeachersController);

router.post('/book-appointment' ,authMiddleware ,bookeAppointmnetController);
router.get("/user-appointments", authMiddleware, userAppointmentsController)

module.exports = router;



























/*const express = require("express");
const { loginController, RegisterController ,authController , applyTeacherController } = require("../controllers/userCtrl").default;

const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();

router.post('/login', loginController)
router.post('/register',RegisterController)
router.post('/getUserData', authMiddleware, authController)




//APply Doctor || POST
router.post("/apply-teacher", authMiddleware, applyTeacherController);

//Notifiaction  Doctor || POST
/*
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);



module.exports = router;*/