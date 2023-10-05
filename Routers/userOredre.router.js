import express from "express";
import { addOrderdetails, getOrderDetails } from "../Controllers/userOrder.controller";

const userOrder = express.Router();

userOrder.post("/add-orderdetails", addOrderdetails);
userOrder.get("/get-orderdetails", getOrderDetails);

export default userOrder;
