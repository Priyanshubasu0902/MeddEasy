import express from "express";
import { deleteUser, editUser, getUser, loginUser, setPassword, signUpUser } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from '../config/multer.js';

const router = express.Router();

// Login user
router.post("/login",loginUser);

// Sign up user
router.post("/signUp", upload.single('image'), signUpUser);

// Get user data
router.get("/user", isLoggedIn , getUser);

// Edit user details
router.post("/editDetails", isLoggedIn, editUser);

// Delete User
router.get("/deleteUser", isLoggedIn, deleteUser);

// Set Password
router.post('/setPassword', isLoggedIn, setPassword);

export default router;
