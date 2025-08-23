import { v2 as cloudinary } from "cloudinary";
import prescriptionsModel from "../models/Prescription.js";

export const addPrescription = async (req, res) => {
  const { fileName, doctorName } = req.body;
  const user = req.user;
  const prescriptionFile = req.file;

  if (fileName === "" || doctorName === "" || !prescriptionFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const fileUpload = await cloudinary.uploader.upload(prescriptionFile.path);
    const date = Date.now();

    const prescription = await prescriptionsModel.create({
      fileName,
      doctorName,
      userId: user._id,
      link: fileUpload.secure_url,
      public_id: fileUpload.public_id,
      date,
    });

    res.json({
      success: true,
      prescription,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPrescriptions = async (req, res) => {
  const user = req.user;

  try {
    const prescription = await prescriptionsModel.find({ userId: user._id });
    res.json({ success: true, prescription });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPrescription = async (req, res) => {
  try {
    const prescription = await prescriptionsModel.findOne({
      _id: req.params.id,
    });
    res.json({ success: true, prescription });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const editPrescription = async (req, res) => {
  const { fileName, doctorName } = req.body;
  const prescriptionFile = req.file;

  if (fileName === "" || doctorName === "") {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    if (prescriptionFile) {
      const prescription = await prescriptionsModel.findOne({
        _id: req.params.id,
      });
      await cloudinary.uploader.destroy(prescription.public_id);
      const fileUpload = await cloudinary.uploader.upload(
        prescriptionFile.path
      );
      const updatedPrescription = await prescriptionsModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          fileName,
          doctorName,
          link: fileUpload.secure_url,
          public_id: fileUpload.public_id,
        }
      );
    } else {
      const updatedPrescription = await prescriptionsModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          fileName,
          doctorName,
        }
      );
    }

    res.json({
      success: true,
      message: "Updated Changes",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deletePrescription = async (req, res) => {
  try {
    const prescription = await prescriptionsModel.findOneAndDelete({ _id: req.params.id });
    await cloudinary.uploader.destroy(prescription.public_id);
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
