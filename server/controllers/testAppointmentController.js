import testAppointmentModel from '../models/TestAppointment.js'

export const addTestAppointment = async (req, res) => {
   const user = req.user
   const {date, time, labName, purpose, status} = req.body

   try {
      if(date==='' || time==='' || labName==='' || purpose==='' || status==='') {
         return res.json({success: false, message:"Missing Details"})
      }

      const testAppointment = await testAppointmentModel.create({
         date,
         time,
         labName,
         purpose,
         status,
         userId: user._id
      })

      res.json({success: true, testAppointment})
   } catch (error) {
      res.json({success: false, message: error.message})
   }
}
export const getTestAppointments = async (req, res) => {
   const user = req.user

   try {
      const testAppointments = await testAppointmentModel.find({userId:user._id})
      res.json({success:true, testAppointments})
   } catch (error) {
      res.json({success: false, message:error.message})
   }
}

export const getTestAppointment = async (req, res) => {
   try {
      const testAppointment = await testAppointmentModel.findOne({_id:req.params.id})
      res.json({success:true, testAppointment})
   } catch (error) {
      res.json({success: false, message:error.message})
   }
}

export const editTestAppointment = async (req, res) => {
   const {date, time, labName, purpose, status} = req.body

   try {
      if(date==='' || time==='' || labName==='' || purpose==='' || status==='') {
         return res.json({success: false, message:"Missing Details"})
      }

      const testAppointment = await testAppointmentModel.findOneAndUpdate({_id:req.params.id}, {
         date,
         time,
         labName,
         purpose,
         status
      })

      res.json({success: true, message:"Saved Changes"})
   } catch (error) {
      res.json({success: false, message: error.message})
}
}
export const deleteTestAppointment = async (req, res) => {
   try {
      await testAppointmentModel.findOneAndDelete({_id:req.params.id})
      res.json({success:true, message:"Record Deleted"})
   } catch (error) {
      res.json({success:false, message:error.message})
   }
}
export const updateTestAppointment = async (req, res) => {

}