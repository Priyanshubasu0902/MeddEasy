import cron from "node-cron";
import appointmentModel from "../models/Appointment.js";
import testAppointmentModel from "../models/TestAppointment.js";
import userModel from "../models/User.js";
import { transporter } from "../config/nodeMailer.js";
import moment from "moment";

export const checkAppointment = () => {
  try {
    cron.schedule("0 0 1 * * *", async () => {
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
            subject: "Email from MeddEasy [Reminder]",
            text:
              "Hi " +
              user.name +
              ",\n\n" +
              "You have an appointment scheduled today with " +
              a.doctorName +
              " at " +
              a.time +
              ". Please make sure to be on time" +
              ".\n\n" +
              "Thank you,\n" +
              "The MeddEasy Team",
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        if (
          moment(new Date(a.date).setHours(0, 0, 0, 0)).diff(
            new Date().setHours(0, 0, 0, 0),
            "days"
          ) <= 2 &&
          new Date(a.date) > new Date() &&
          a.status === "booked"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MeddEasy [Reminder]",
            text:
              "Hi " +
              user.name +
              ",\n\n" +
              "You have an appointment scheduled on " +
              a.date +
              " with " +
              a.doctorName +
              " at " +
              a.time +
              ". Please make sure to be on time" +
              ".\n\n" +
              "Thank you,\n" +
              "The MeddEasy Team",
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        if (
          moment(new Date(a.date).setHours(0, 0, 0, 0)).diff(
            new Date().setHours(0, 0, 0, 0),
            "days"
          ) <= 2 &&
          new Date(`${a.date}T${a.time}`) >= new Date() &&
          a.status === "not booked"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MeddEasy [Reminder]",
            text:
              "Hi " +
              user.name +
              ",\n\n" +
              "You have not booked an appointment on " +
              a.date +
              " with " +
              a.doctorName +
              ". If you have already booked, please update the status in the MeddEasy platform for your convenience and accurate tracking" +
              ".\n\n" +
              "Thank you,\n" +
              "The MeddEasy Team",
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        if (
          moment(new Date().setHours(0, 0, 0, 0)).diff(
            new Date(a.date).setHours(0, 0, 0, 0),
            "days"
          ) <= 2 &&
          new Date(a.date).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0) &&
          a.status !== "visited"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MeddEasy",
            text:
              "Hi " +
              user.name +
              ",\n\n" +
              "Our records show that you missed an appointment on " +
              a.date +
              " with " +
              a.doctorName +
              ". If you have already completed this appointment, please update the status in the MeddEasy platform for you convenience and accurate tracking" +
              ".\n\n" +
              "Thank you,\n" +
              "The MeddEasy Team",
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

export const checkTestAppointment = () => {
  try {
    cron.schedule("0 0 2 * * *", async () => {
      const testAppointments = await testAppointmentModel.find({});
      testAppointments.forEach(async (a) => {
        const user = await userModel.findOne({ _id: a.userId });
        if (
          new Date(a.date).setHours(0, 0, 0, 0) ===
            new Date().setHours(0, 0, 0, 0) &&
          a.status === "booked"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MeddEasy [Reminder]",
            text:
              "Hi " +
              user.name +
              ",\n\n" +
              "You have an test appointment scheduled today from " +
              a.labName +
              " at " +
              a.time +
              ". Please make sure to be on time" +
              ".\n\n" +
              "Thank you,\n" +
              "The MeddEasy Team",
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        if (
          moment(new Date(a.date).setHours(0, 0, 0, 0)).diff(
            new Date().setHours(0, 0, 0, 0),
            "days"
          ) <= 2 &&
          new Date(a.date) > new Date() &&
          a.status === "booked"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MeddEasy [Reminder]",
            text:
              "Hi " +
              user.name +
              ",\n\n" +
              "You have an test appointment scheduled on " +
              a.date +
              " from " +
              a.labName +
              " at " +
              a.time +
              ". Please make sure to be on time" +
              ".\n\n" +
              "Thank you,\n" +
              "The MeddEasy Team",
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        if (
          moment(new Date(a.date).setHours(0, 0, 0, 0)).diff(
            new Date().setHours(0, 0, 0, 0),
            "days"
          ) <= 2 &&
          new Date(`${a.date}T${a.time}`) >= new Date() &&
          a.status === "not booked"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MeddEasy [Reminder]",
            text:
              "Hi " +
              user.name +
              ",\n\n" +
              "You have not completed booking of a test appointment on " +
              a.date +
              " from " +
              a.labName +
              ". If already booked, please update the status in the MeddEasy platform for you convenience and accurate tracking" +
              ".\n\n" +
              "Thank you,\n" +
              "The MeddEasy Team",
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        if (
          moment(new Date().setHours(0, 0, 0, 0)).diff(
            new Date(a.date).setHours(0, 0, 0, 0),
            "days"
          ) <= 2 &&
          new Date(a.date).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0) &&
          a.status !== "visited"
        ) {
          let mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Email from MeddEasy",
            text:
              "Hi " +
              user.name +
              ",\n\n" +
              "Our records show that you missed a test appointment on " +
              a.date +
              " from " +
              a.labName +
              ". If you have already completed this appointment, please update the status in the MeddEasy platform for you convenience and accurate tracking" +
              ".\n\n" +
              "Thank you,\n" +
              "The MeddEasy Team",
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
