import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../Controllers/category.controller";
const categoryRouter = express.Router();
categoryRouter.get("/get-category", getCategory);
categoryRouter.post("/add-category", addCategory);
categoryRouter.put("/update-category/:category_id", updateCategory);
categoryRouter.delete("/delete-category/:category_id", deleteCategory);

export default categoryRouter;
