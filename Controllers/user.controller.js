import userModel from "../Models/user.model";
import { MulterFun } from "../Middleware/Multer";
import bcrypt from "bcrypt";
import path from "path";
import nodemailer from "nodemailer";
import fs from "fs";
import hbs from "nodemailer-express-handlebars";
import jwt from "jsonwebtoken";

export const SignUp = (req, res) => {
  try {
    const uploadFile = MulterFun("./uploads/user").single("avatar");
    uploadFile(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const { username, name, email, password, contact, role } = req.body;
      const getUserEmail = await userModel.findOne({ email: email });
      const getUserUsername = await userModel.findOne({ username: username });
      if (getUserEmail) {
        return res.status(400).json({
          message: "This Email is already used",
        });
      }
      if (getUserUsername) {
        return res.status(400).json({
          message: "This Username is already used",
        });
      }
      let avatar = "";
      if (req.file !== undefined) {
        avatar = req.file.filename;
      }
      const newPassword = bcrypt.hashSync(password, 10);
      const SignUp = new userModel({
        username: username,
        name: name,
        contact: contact,
        email: email,
        role: role,
        password: newPassword,
        avatar: avatar,
      });
      SignUp.save();
      if (SignUp) {
        res.status(200).json({
          data: SignUp,
          message: "SignUp successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const checkuser = await userModel.findOne({
      $or: [
        { email: email },
        { username: username },
        { email: email, username: username },
      ],
    });
    if (!checkuser) {
      return res.status(403).json({
        message: "Invalid username or Email",
      });
    }
    const NewPassword = bcrypt.compareSync(password, checkuser.password);
    if (!NewPassword) {
      return res.status(403).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { userId: checkuser._id, email: checkuser.email },
      process.env.SECRET_KEY || secretkey,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      data: checkuser,
      message: "SignIn successfully",
      path: process.env.BASE_URL + "/uploads/user/",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const ForgetPassword = async (req, res) => {
  try {
    const { email, username } = req.body;
    const checkuser = await userModel.findOne({
      $or: [
        { email: email },
        { username: username },
        { email: email, username: username },
      ],
    });
    if (!checkuser) {
      return res.status(403).json({
        message: "Invalid username or Email",
      });
    }
    const mainotp = parseInt(Math.random() * 1000000);

    const Updateotp = await userModel.updateOne(
      { _id: checkuser._id },
      { $set: { otp: mainotp } }
    );

    if (Updateotp.acknowledged) {
      res.status(200).json({
        message: "Send OTP Successfully",
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const handlebaroptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "../views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "../views"),
      extName: ".handlebars",
    };
    transporter.use("compile", hbs(handlebaroptions));

    const info = transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: checkuser.email, // list of receivers
      subject: "Verify OTP with Email", // Subject line
      text: `${mainotp}`, // plain text body
      // html: `mahi`, // html body
      template: "email",
      context: {
        name: checkuser.name,
        username: checkuser.username,
        otp: mainotp,
      },
    });
    // console.log("Message sent: %s", info.messageId);
    setTimeout(async () => {
      const nullotp = await userModel.updateOne(
        { _id: checkuser._id },
        { $set: { otp: null } }
      );
    }, 120000);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const UpdateUser = (req, res) => {
  try {
    const uploadFile = MulterFun("./uploads/user").single("avatar");
    uploadFile(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const userID = req.params.user_id;
      const { name, password, contact, role, status } = req.body;
      const checkuser = await userModel.findOne({ _id: userID });
      let avatar = checkuser.avatar;
      if (req.file !== undefined) {
        avatar = req.file.filename;
        if (checkuser.avatar !== "") {
          if (fs.existsSync("./uploads/user/" + checkuser.avatar)) {
            fs.unlinkSync("./uploads/user/" + checkuser.avatar);
          }
        }
      }
      let NewPassword = checkuser.password;
      if (req.body.password) {
        NewPassword = bcrypt.hashSync(password, 10);
      }
      const updateUser = await userModel.updateOne(
        { _id: userID },
        {
          $set: {
            name: name,
            password: NewPassword,
            contact: contact,
            role: role,
            avatar: avatar,
            status: status,
          },
        }
      );
      if (updateUser.acknowledged) {
        return res.status(200).json({
          data: updateUser,
          message: "User updated successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await userModel.find();
    if (getAllUsers) {
      return res.status(200).json({
        data: getAllUsers,
        message: "all users found",
        path: process.env.BASE_URL + "/uploads/user/",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const getuser = await userModel.findOne({ _id: userID });
    const deleteUser = await userModel.deleteOne({ _id: userID });
    if (deleteUser.acknowledged) {
      if (fs.existsSync("./uploads/user/" + getuser.avatar)) {
        fs.unlinkSync("./uploads/user/" + getuser.avatar);
      }
      res.status(200).json({
        data: deleteUser,
        message: "user deleted Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
