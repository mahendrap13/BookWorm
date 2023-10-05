import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../Controllers/product.controller";
const productRouter = express.Router();
productRouter.post("/add-product", addProduct);
productRouter.put("/update-product/:product_id", updateProduct);
productRouter.get("/get-product", getProduct);
productRouter.delete("/delete-product/:product_id", deleteProduct);

export default productRouter;
