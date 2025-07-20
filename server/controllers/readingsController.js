import readingsModel from "../models/Readings.js";

export const getReadings = async (req, res) => {
  const user = req.user;
  try {
    const readings = await readingsModel.find({ userId: user._id });
    res.json({success:true, readings});
  } catch (error) {
   res.json({success:false, message:error.message})
  }
};

export const getReading = async (req, res) => {
  try {
    const reading = await readingsModel.findOne({ _id: req.params.id });
    res.json({success:true, reading});
  } catch (error) {
   res.json({success:false, message:error.message})
  }
};

export const addReadings = async (req, res) => {
  const user = req.user;
  const { type, reading, date, time } = req.body;

    if (!reading || !date || !time || !type) {
      return res.json({ success: false, message: "Missing Details" });
    }
    try {
      const createdReading = await readingsModel.create({
        type,
        reading,
        date,
        time,
        userId: user._id,
      });

      res.json({ success: true, createdReading });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
};
export const deleteReadings = async (req, res) => {
   try {
      await readingsModel.findOneAndDelete({_id: req.params.id})
      res.json({success: true, message:"Record Deleted"})
   } catch (error) {
      res.json({success:false, message:error.message});
   }
};
export const editReadings = async (req, res) => {
  const {reading, date, time, type} = req.body;
  if(!reading||!date||!time||!type) {
    res.json({success:false, message:'Missing Details'})
  }
  try {
    const editedReading = await readingsModel.findOneAndUpdate({_id:req.params.id},{reading, date, time, type})
    res.json({success:true, message:'Changes Updated'})
  } catch (error) {
    res.json({success:false, message:error.message})
  }
};
