import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { addDoctor, deleteDoctor, getDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/addDoctor', isLoggedIn, addDoctor)

router.post('/editDoctor', isLoggedIn, (req, res)=>{})

router.get('/getDoctor', isLoggedIn, getDoctor)

router.get('/deleteDoctor/:id', isLoggedIn, deleteDoctor)

export default router;