import mongoose from "mongoose";
const { Schema } = mongoose;
const CategoryModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  status: {
    type: Number,
    default: 1,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Categories", CategoryModel);
