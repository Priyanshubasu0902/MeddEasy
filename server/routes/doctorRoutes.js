import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { addDoctor, deleteDoctor, editDoctor, getDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/addDoctor', isLoggedIn, addDoctor)

router.post('/editDoctor/:id', isLoggedIn, editDoctor)

router.get('/getDoctor', isLoggedIn, getDoctor)

router.get('/deleteDoctor/:id', isLoggedIn, deleteDoctor)

export default router;