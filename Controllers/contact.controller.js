import contactModel from "../Models/contact.model";

export const addContactdetails = (req, res) => {
  try {
    const addContact = new contactModel({
      ...req.body,
    });
    addContact.save();
    if (addContact) {
      return res.status(200).json({
        data: addContact,
        message: "Contact details added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getContactdetails = async (req, res) => {
  try {
    const getContact = await contactModel.find();
    if (getContact) {
      return res.status(200).json({
        data: getContact,
        message: "Contact details retrieved successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
