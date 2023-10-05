import productModel from "../Models/product.model";
import { MulterFun } from "../Middleware/Multer";
import path from "path";
import fs from "fs";

export const addProduct = (req, res) => {
  try {
    const uploadFile = MulterFun("./uploads/product").array("images");
    uploadFile(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      let images = [];
      if (req.files !== undefined) {
        for (let i = 0; i < req.files.length; i++) {
          images.push(req.files[i].filename);
        }
      }
      const addProduct = new productModel({
        ...req.body,
        images: images,
      });
      addProduct.save();
      if (addProduct) {
        return res.status(200).json({
          data: addProduct,
          message: "Product added successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = (req, res) => {
  try {
    const uploadFile = MulterFun("./uploads/product").array("images");
    uploadFile(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const productID = req.params.product_id;
      const getProduct = await productModel.findOne({ _id: productID });
      let images = getProduct.images;
      if (req.files.length > 0) {
        images = [];
        if (req.files !== undefined) {
          for (let i = 0; i < getProduct.images.length; i++) {
            if (fs.existsSync("./uploads/product/" + getProduct.images[i])) {
              fs.unlinkSync("./uploads/product/" + getProduct.images[i]);
            }
          }
          for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i].filename);
          }
        }
      }
      const updateProduct = await productModel.updateOne(
        { _id: productID },
        {
          $set: {
            ...req.body,
            images: images,
          },
        }
      );

      if (updateProduct.acknowledged) {
        return res.status(201).json({
          data: updateProduct,
          message: "Product updated successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const getProduct = await productModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryId",
        },
      },
      { $unwind: "$categoryId" },
    ]);
    if (getProduct) {
      return res.status(200).json({
        data: getProduct,
        message: "Product found successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const findProduct = await productModel.findOne({ _id: productID });
    if (findProduct.images.length > 0) {
      for (let i = 0; i < findProduct.images.length; i++) {
        if (fs.existsSync("./uploads/product/" + findProduct.images[i])) {
          fs.unlinkSync("./uploads/product/" + findProduct.images[i]);
        }
      }
    }
    const deleteProduct = await productModel.deleteOne({ _id: productID });
    if (deleteProduct.acknowledged) {
      res.status(200).json({
        data: deleteProduct,
        message: "Product deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
