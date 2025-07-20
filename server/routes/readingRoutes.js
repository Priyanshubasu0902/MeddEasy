import express from 'express'
import {isLoggedIn} from '../middlewares/isLoggedIn.js'
import { addReadings, deleteReadings, getReadings, getReading, editReadings } from '../controllers/readingsController.js';

const router = express.Router();

// Add Readings
router.post('/addReadings', isLoggedIn, addReadings);

// Edit Readings
router.post('/editReading/:id', isLoggedIn, editReadings);

// Delete Readings
router.get('/deleteReadings/:id', isLoggedIn, deleteReadings);

// Get Readings Data
router.get('/getReadings', isLoggedIn, getReadings );

// Get Particular Reading data
router.get('/getReading/:id', isLoggedIn, getReading );

export default router;