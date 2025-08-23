import appointmentModel from '../models/Appointment.js'

export const addAppointment = async (req, res) => {
   const user = req.user
   const {date, time, doctorName, purpose, status} = req.body

   try {
      if(date==='' || time==='' || doctorName==='' || purpose==='' || status==='') {
         return res.json({success: false, message:"Missing Details"})
      }

      const appointment = await appointmentModel.create({
         date,
         time,
         doctorName,
         purpose,
         status,
         userId: user._id
      })

      res.json({success: true, appointment})
   } catch (error) {
      res.json({success: false, message: error.message})
   }
}
export const getAppointments = async (req, res) => {
   const user = req.user

   try {
      const appointments = await appointmentModel.find({userId:user._id})
      res.json({success:true, appointments})
   } catch (error) {
      res.json({success: false, message:error.message})
   }
}

export const getAppointment = async (req, res) => {
   try {
      const appointment = await appointmentModel.findOne({_id:req.params.id})
      res.json({success:true, appointment})
   } catch (error) {
      res.json({success: false, message:error.message})
   }
}

export const editAppointment = async (req, res) => {
   const {date, time, doctorName, purpose, status} = req.body

   try {
      if(date==='' || time==='' || doctorName==='' || purpose==='' || status==='') {
         return res.json({success: false, message:"Missing Details"})
      }

      const appointment = await appointmentModel.findOneAndUpdate({_id:req.params.id}, {
         date,
         time,
         doctorName,
         purpose,
         status
      })

      res.json({success: true, message:"Saved Changes"})
   } catch (error) {
      res.json({success: false, message: error.message})
}
}
export const deleteAppointment = async (req, res) => {
   try {
      await appointmentModel.findOneAndDelete({_id:req.params.id})
      res.json({success:true, message:"Record Deleted"})
   } catch (error) {
      res.json({success:false, message:error.message})
   }
}
export const updateAppointment = async (req, res) => {

}