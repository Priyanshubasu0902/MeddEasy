import express from 'express'
import upload from '../config/multer.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js'
import { addTestResult, deleteTestResult, editTestResult, getTestResult, getTestResults } from '../controllers/testResultsController.js';

const router = express.Router();

// Add Test Result
router.post('/addTestResult', isLoggedIn , upload.single('testResult'), addTestResult );

// Edit Test Result
router.post('/editTestResult/:id', isLoggedIn, upload.single('testResult'), editTestResult);

// Delete Test Result
router.get('/deleteTestResult/:id', isLoggedIn, deleteTestResult );

// Get Test Result Data
router.get('/getTestResults', isLoggedIn , getTestResults );

router.get('/getTestResult/:id', isLoggedIn , getTestResult );

export default router;