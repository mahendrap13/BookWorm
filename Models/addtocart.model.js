import mongoose from "mongoose";
const { Schema } = mongoose;

const addtocart = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productId: { 
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("carts", addtocart);
