import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
   date:{type:String, required: true},
   time:{type:String, required:true},
   userId:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
   doctorName:{type: String, required:true},
   purpose:{type: String, required:true},
   status:{type: String, required:true, default:"not booked"}
})

const appointment = mongoose.model('appointment', appointmentSchema);

export default appointment