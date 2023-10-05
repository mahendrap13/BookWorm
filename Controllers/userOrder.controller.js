import userOrderModel from "../Models/userOrder.model";
export const addOrderdetails = (req, res) => {
  try {
    const addOrder = new userOrderModel({
      ...req.body,
    });
    addOrder.save();
    if (addOrder) {
      return res.status(200).json({
        data: addOrder,
        message: "Order added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const orderDetails = await userOrderModel.find();
    if (orderDetails) {
      return res.status(200).json({
        data: orderDetails,
        message: "Order details fetched successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
