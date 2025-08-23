import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileDescription: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  link: { type: String, required: true },
  public_id: { type: String, required: true },
  date: { type: Number, required: true, default: Date.now() },
});

const testResult = mongoose.model("testResult", testSchema);

export default testResult;
