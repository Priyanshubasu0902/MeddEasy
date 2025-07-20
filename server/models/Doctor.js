import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
   name:{type:String, required:true},
   speciality:{type:String, required:true},
   number:{type:Number},
   userId:{type:mongoose.Schema.Types.ObjectId, required: true}
})

const doctor = mongoose.model('doctor', doctorSchema);

export default doctor