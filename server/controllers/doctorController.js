import doctorModel from '../models/Doctor.js'

export const addDoctor = async(req, res) => {
   const user = req.user
   const {name, speciality, number} = req.body
   if(!name||!speciality) {
      return res.json({success: false, message:"Missing Details"})
   }
   try {
      const doctor = await doctorModel.create({
         name,
         speciality,
         number,
         userId: user._id
      })

      res.json({success: true, message:"Doctor Added", doctor})
   } catch (error) {
      res.json({success:false, message:error.message})
   }
}

export const editDoctor = async(req, res) => {
   
}

export const getDoctor = async(req, res) => {
   const user = req.user
   try {
      const doctor = await doctorModel.find({userId:user._id})
      res.json({success:true, doctor})
   } catch (error) {
      res.json({success:false, message:error.message})
   }
}

export const deleteDoctor = async(req, res) => {
   try {
      await doctorModel.findOneAndDelete({_id:req.params.id})
      res.json({success:true, message:"Doctor Deleted"})
   } catch (error) {
      res.json({success:false, message:error.message})
   }
}