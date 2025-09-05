import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import doctorModel from "../models/Doctor.js";
import readingModel from "../models/Readings.js";
import appointmentModel from "../models/Appointment.js";
import prescriptionModel from "../models/Prescription.js";
import testResultModel from "../models/TestResult.js";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
import { transporter } from "../config/nodeMailer.js";

export const signUpUser = async (req, res) => {
  const { name, email, number, age, gender, password } = req.body;

  if (!req.file) {
    return res.json({ success: false, message: "Image is missing" });
  }

  const image = req.file;

  if (
    name === "" ||
    email === "" ||
    number === "" ||
    age === "" ||
    gender === "" ||
    password === "" ||
    !image
  ) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const imageUpload = await cloudinary.uploader.upload(image.path);
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      number,
      age,
      gender,
      image: imageUpload.secure_url,
      public_id: imageUpload.public_id,
      password: hashPassword,
      email,
    });

    let mailOptions = {
      from: process.env.EMAIL_ID,
      to: user.email,
      subject: "Email from MeddEasy",
      text:
        "Hi " +
        user.name +
        ", you are registered successfully. Thank You for trusting our application. Hope you enjoy your journey in MeddEasy",
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        gender: user.gender,
        age: user.age,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { number, email, password } = req.body;
  if (password === "") {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    if (number === "") {
      if (email === "") {
        return res.json({ success: false, message: "Missing Details" });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
      if (await bcrypt.compare(password, user.password)) {
        res.json({
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            number: user.number,
            gender: user.gender,
            age: user.age,
          },
          token: generateToken(user._id),
        });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } else if (email === "") {
      if (number === "") {
        return res.json({ success: false, message: "Missing Details" });
      }
      const user = await userModel.findOne({ number });
      if (!user) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
      if (await bcrypt.compare(password, user.password)) {
        res.json({
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            number: user.number,
            gender: user.gender,
            age: user.age,
          },
          token: generateToken(user._id),
        });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.json({ success: true, user });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const user = req.user;
  try {
    const deletedUser = await userModel.findOneAndDelete({ _id: user._id });
    await cloudinary.uploader.destroy(deletedUser.public_id);

    await readingModel.deleteMany({ userId: user._id });
    await appointmentModel.deleteMany({ userId: user._id });

    const prescriptions = await prescriptionModel.find(
      { userId: user._id },
      { public_id: 1, _id: 0 }
    );
    const prescriptions_id = prescriptions.map((item) => item.public_id);
    await prescriptionModel.deleteMany({ userId: user._id });
    cloudinary.api.delete_resources(prescriptions_id);

    const results = await testResultModel.find(
      { userId: user._id },
      { public_id: 1, _id: 0 }
    );
    const testResult = results.map((item) => item.public_id);
    await testResultModel.deleteMany({ userId: user._id });
    cloudinary.api.delete_resources(testResult);

    await doctorModel.deleteMany({ userId: user._id });
    let mailOptions = {
      from: process.env.EMAIL_ID,
      to: user.email,
      subject: "Email from MeddEasy",
      text:
        "Hi " +
        user.name +
        ", we are saddened to hear you are leaving us. Sorry for any inconvinience you faced. We would surely improve ourselves to be better at your service. Hope to see you soon",
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const editUser = async (req, res) => {
  const user = req.user;
  const { name, age, gender } = req.body;
  if (!name || !age || !gender) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const editedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { name, age, gender }
    );
    res.json({ success: true, message: "Details Updated", user: editedUser });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const setPassword = async (req, res) => {
  const user = req.user;
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword) {
    return res.json({ success: false, message: "Missing Details" });
  }
  if (password !== confirmPassword) {
    return res.json({ success: false, message: "Password does not match" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const foundedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { password: hashPassword }
    );

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
