import { v2 as cloudinary } from "cloudinary";
import testResultModel from "../models/TestResult.js";

export const addTestResult = async (req, res) => {
  const { fileName, fileDescription } = req.body;
  const user = req.user;
  const testFile = req.file;

  if (!fileName || !fileDescription || !testFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const fileUpload = await cloudinary.uploader.upload(testFile.path);
    const date = Date.now();

    const testResult = await testResultModel.create({
      fileName,
      fileDescription,
      userId: user._id,
      link: fileUpload.secure_url,
      date,
    });

    res.json({
      success: true,
      testResult,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getTestResults = async (req, res) => {
  const user = req.user;

  try {
    const testResults = await testResultModel.find({ userId: user._id });
    res.json({ success: true, testResults });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getTestResult = async (req, res) => {
  try {
    const testResult = await testResultModel.findOne({ _id: req.params.id });
    res.json({ success: true, testResult });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const editTestResult = async (req, res) => {
  const { fileName, fileDescription } = req.body;
  const testFile = req.file;

  if (!fileName || !fileDescription) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    if (testFile) {
      const fileUpload = await cloudinary.uploader.upload(testFile.path);
      const testResult = await testResultModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          fileName,
          fileDescription,
          link: fileUpload.secure_url,
        }
      );
    } else {
      const testResult = await testResultModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          fileName,
          fileDescription,
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

export const deleteTestResult = async (req, res) => {
  try {
    await testResultModel.findOneAndDelete({ _id: req.params.id });
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
