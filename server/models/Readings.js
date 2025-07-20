import mongoose from "mongoose";

const readingSchema = mongoose.Schema({
  reading: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  time: { type: String, required: true },
  date: { type: String, required: true, default: Date.now() },
});

const reading = mongoose.model("reading", readingSchema);

export default reading;
