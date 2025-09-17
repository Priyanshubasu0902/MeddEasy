import mongoose from "mongoose";

const testAppointmentSchema = mongoose.Schema({
   date:{type:String, required: true},
   time:{type:String, required:true},
   userId:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
   labName:{type: String, required:true},
   purpose:{type: String, required:true},
   status:{type: String, required:true, default:"not booked"}
})

const testAppointment = mongoose.model('testAppointment', testAppointmentSchema);

export default testAppointment