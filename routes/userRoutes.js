const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsControll,
  bookAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  

} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

// login
router.post("/login", loginController);

// register
router.post("/register", registerController);

// Auth
router.post("/getUserData", authMiddleware, authController);

// Apply Doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification Doctor
router.post("/get-all-notification", authMiddleware, getAllNotificationController);

// Delete Notification Doctor
router.post("/delete-all-notification", authMiddleware,deleteAllNotificationController);

// Get ALL Doctor

router.get("/getAllDoctors", authMiddleware,getAllDoctorsControll);

// Book Appointment
router.post("/book-appointment",authMiddleware,bookAppointmnetController);

// Check Availability
router.post( "/booking-availbility",authMiddleware,bookingAvailabilityController);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
