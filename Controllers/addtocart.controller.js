import addtocartModel from "../Models/addtocart.model";

export const addToCart = async (req, res) => {
  try {
    const findData = await addtocartModel.findOne({
      userId: req.body.userId,
      productId: req.body.productId,
    });
    if (findData) {
      return res.status(200).json({
        message: "product already exists in your cart",
      });
    }
    const addtocart = new addtocartModel({
      ...req.body,
    });
    await addtocart.save();
    if (addtocart) {
      res.status(200).json({
        data: addtocart,
        message: `${req.body.title} has been added to your cart.`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartData = async (req, res) => {
  try {
    const getCartData = await addtocartModel.find();
    // .aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "userId",
    //       foreignField: "_id",
    //       as: "userId",
    //     },
    //   },
    //   { $unwind: "$userId" },
    // ]);
    if (getCartData) {
      res.status(200).json({
        data: getCartData,
        message: "Successfully fetched cart data",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const CartId = req.params.cart_id;
    const deleteItem = await addtocartModel.deleteOne({ _id: CartId });
    if (deleteItem.acknowledged) {
      return res.status(201).json({
        data: deleteItem,
        message: "Cart deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const CartId = req.params.cart_id;
    const { type } = req.query;
    const cartItem = await addtocartModel.findOne({ _id: CartId });
    if (cartItem.quantity >= 10 && type === "inc") {
      return res.status(400).json({
        message: "You have reached the limit of 10 products in your cart",
      });
    }
    if (cartItem.quantity <= 1 && type === "dec") {
      const deleteCart = await addtocartModel.deleteOne({ _id: CartId });
      if (deleteCart) {
        return res.status(400).json({
          message: " Cart Item Deleted",
        });
      }
    }
    let quantity = cartItem.quantity;
    if (type === "inc") {
      quantity = quantity + 1;
    } else if (type === "dec") {
      quantity = quantity - 1;
    }
    const updateCart = await addtocartModel.updateOne(
      { _id: CartId },
      {
        $set: { quantity: quantity },
      }
    );
    if (updateCart) {
      return res.status(200).json({
        message: "Cart Updated",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCartMany = async (req, res) => {
  try {
    const cartIds = req.params.cart_id.split(",");
    const deleteManyItem = await addtocartModel.deleteMany({
      _id: { $in: cartIds },
    });
    if (deleteManyItem.acknowledged) {
      return res.status(201).json({
        data: deleteManyItem,
        message: "All Cart deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
