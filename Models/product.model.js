import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProductModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: null,
  },
  quantity: {
    type: Number,
    required: true,
  },
  bookformat: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});
export default mongoose.model("Products", ProductModel);