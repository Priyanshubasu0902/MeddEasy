import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { addTestAppointment, deleteTestAppointment, getTestAppointments, getTestAppointment, editTestAppointment } from '../controllers/testAppointmentController.js';

const router = express.Router();

// Add Test Appointment
router.post('/addTestAppointment', isLoggedIn, addTestAppointment );

// Edit Test Appointment
router.post('/editTestAppointment/:id', isLoggedIn, editTestAppointment );

// Delete Test Appointment
router.get('/deleteTestAppointment/:id', isLoggedIn, deleteTestAppointment );

// Get Test Appointments
router.get('/getTestAppointments', isLoggedIn, getTestAppointments );

// Get Test Appointment
router.get('/getTestAppointment/:id', isLoggedIn, getTestAppointment );

// Update Test Appointment
router.get('/updateTestAppointment', isLoggedIn, (req, res) => {
   
} );

export default router;