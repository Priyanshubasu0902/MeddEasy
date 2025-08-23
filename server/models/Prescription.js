import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema({
  fileName: { type: String, required: true },
  doctorName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  link: { type: String, required: true },
  public_id: { type: String, required: true },
  date: { type: Number, required: true, default: Date.now() },
});

const prescription = mongoose.model("prescription", prescriptionSchema);

export default prescription;
