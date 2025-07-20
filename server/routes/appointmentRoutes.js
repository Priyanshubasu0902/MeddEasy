import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { addAppointment, deleteAppointment, getAppointments, getAppointment, editAppointment } from '../controllers/appointmentsController.js';

const router = express.Router();

// Add Appointment
router.post('/addAppointment', isLoggedIn, addAppointment );

// Edit Appointment
router.post('/editAppointment/:id', isLoggedIn, editAppointment );

// Delete Appointment
router.get('/deleteAppointment/:id', isLoggedIn, deleteAppointment );

// Get Appointments
router.get('/getAppointments', isLoggedIn, getAppointments );

// Get Appointment
router.get('/getAppointment/:id', isLoggedIn, getAppointment );

// Update Appointment
router.get('/updateAppointment', isLoggedIn, (req, res) => {
   
} );

export default router;