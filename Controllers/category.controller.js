import categoryModel from "../Models/category.model";

export const addCategory = (req, res) => {
  try {
    const addCategory = new categoryModel({
      ...req.body,
    });
    addCategory.save();
    if (addCategory) {
      return res.status(200).json({
        data: addCategory,
        message: "Added category successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const categoryID = req.params.category_id;
    const updateCategory = await categoryModel.updateOne(
      { _id: categoryID },
      {
        $set: {
          ...req.body,
        },
      }
    );
    if (updateCategory.acknowledged) {
      return res.status(200).json({
        data: updateCategory,
        message: "Updated category successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const categoryID = req.params.category_id;
    const deleteCategory = await categoryModel.deleteOne({ _id: categoryID });
    if (deleteCategory.acknowledged) {
      return res.status(200).json({
        data: deleteCategory,
        message: "Deleted category successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const getCategory = await categoryModel.find();
    if (getCategory) {
      return res.status(200).json({
        data: getCategory,
        message: "All category found successfully",
        path: process.env.BASE_URL + "/uploads/category",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
