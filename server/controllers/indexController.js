import otpGenerator from "otp-generator";
import userModel from "../models/User.js";
import otpModel from "../models/Otp.js";
import { transporter } from "../config/nodeMailer.js";
import generateToken from "../utils/generateToken.js";

export const generateOtp = async (req, res) => {
  const { email } = req.body;

  if (email==='') {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await otpModel.create({
      email,
      otp,
    });

    let mailOptions = {
      from: process.env.EMAIL_ID,
      to: user.email,
      subject: "Email from MedEasy",
      text: "Hi " + user.name + " Your OTP for verification is " + otp,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (email==='' || otp==='') {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const otpRecord = await otpModel.findOne({ email, otp });

    if (!otpRecord) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const user = await userModel.findOne({ email });
    const token = generateToken(user._id);

    res.json({ success: true, message: "OTP verified successfully", token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
