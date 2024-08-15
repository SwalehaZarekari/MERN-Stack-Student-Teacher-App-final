const express = require("express");
const {
  getTeacherInfoController,updateProfileController,
  teacherAppointmentsController,updateStatusController,
  
} = require("../controllers/teacherCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getTeacherInfo", authMiddleware, getTeacherInfoController);

router.post("/updateProfile", authMiddleware, updateProfileController);

//POST UPDATE PROFILE


router.get(
  "/teacher-appointments",
  authMiddleware,
  teacherAppointmentsController
);

router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;