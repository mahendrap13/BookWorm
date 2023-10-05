import express from "express";
import {
  ForgetPassword,
  SignIn,
  SignUp,
  UpdateUser,
  deleteUser,
  getAllUsers,
} from "../Controllers/user.controller";
const UserRouter = express.Router();
UserRouter.post("/signup-user", SignUp);
UserRouter.post("/signin-user", SignIn);
UserRouter.post("/forget-password", ForgetPassword);
UserRouter.put("/update-user/:user_id", UpdateUser);
UserRouter.get("/get-users", getAllUsers);
UserRouter.delete("/delete-user/:user_id", deleteUser);
export default UserRouter;
