import mongoose from "mongoose";

const { Schema } = mongoose;

const userOrderModel = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postcode: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  orderid: {
    type: Number,
    required: true,
  },
  totalprice: {
    type: Number,
    required: true,
  },
  productdetails: {
    type: Array,
    required: true,
  },
  paymod: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});
export default mongoose.model("orderdetails", userOrderModel);
