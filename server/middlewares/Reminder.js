import cron from "node-cron";
import appointmentModel from "../models/Appointment.js";
import userModel from "../models/User.js";
import { transporter } from "../config/nodeMailer.js";
import moment from "moment";

export const checkAppointment = () => {
  try {
    cron.schedule("0 0 * * *", async () => {
      const appointments = await appointmentModel.find({});
      appointments.forEach(async (a) => {
        const user = await userModel.findOne({ _id: a.userId });
        if (
          new Date(a.date).setHours(0, 0, 0, 0) ===
            new Date().setHours(0, 0, 0, 0) &&
          a.status === "booked"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MedEasy",
            text:
              "Hi " +
              user.name +
              ", you have an appointment scheduled today with " +
              a.doctorName +
              " at " +
              a.time,
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        } else if (
          new Date(a.date).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0) &&
          a.status !== "visited"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MedEasy",
            text:
              "Hi " +
              user.name +
              ", you have missed an appointment on " +
              a.date +
              " with " +
              a.doctorName,
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        if (((moment(new Date(`${a.date}T${a.time}`)).toNow(true) === "2 days")||(moment(`${a.date}T${a.time}`).toNow(true) === "a day")||(moment(`${a.date}T${a.time}`).toNow(true) === "3 days"))&&(a.status==="not booked")) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MedEasy",
            text:
              "Hi " +
              user.name +
              ", you have not booked an appointment on " +
              a.date +
              " with " +
              a.doctorName + ". If already booked please update the status "
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
