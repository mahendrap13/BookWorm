import express from "express";
import {
  addToCart,
  deleteCart,
  deleteCartMany,
  getCartData,
  updateCart,
} from "../Controllers/addtocart.controller";
const addToCartRouter = express.Router();
addToCartRouter.post("/add-to-cart", addToCart);
addToCartRouter.get("/get-cartdata", getCartData);
addToCartRouter.delete("/delete-cartdata/:cart_id", deleteCart);
addToCartRouter.delete("/delete-all-cartdata/:cart_id", deleteCartMany);
addToCartRouter.put("/update-cartdata/:cart_id", updateCart);

export default addToCartRouter;
