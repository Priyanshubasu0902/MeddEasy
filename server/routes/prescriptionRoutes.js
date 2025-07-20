import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import upload from '../config/multer.js';
import { addPrescription, deletePrescription, editPrescription, getPrescription, getPrescriptions } from '../controllers/prescriptionsController.js';

const router = express.Router();

// Add Prescription
router.post('/addPrescription', upload.single('prescription'), isLoggedIn, addPrescription );

// Edit Prescription
router.post('/editPrescription/:id', isLoggedIn, upload.single('prescription'), editPrescription );

// Delete Prescription
router.get('/deletePrescription/:id', isLoggedIn, deletePrescription );

// Get Prescriptions
router.get('/getPrescriptions', isLoggedIn, getPrescriptions );

// Get Prescription
router.get('/getPrescription/:id', isLoggedIn, getPrescription );

export default router;