import mongoose from "mongoose";
const Schema = mongoose.Schema;
const contactModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("contacts", contactModel);
