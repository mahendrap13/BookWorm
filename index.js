import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import UserRouter from "./Routers/user.router";
import categoryRouter from "./Routers/category.router";
import productRouter from "./Routers/product.router";
import addToCartRouter from "./Routers/addtocart.router";
import userOrder from "./Routers/userOredre.router";
import contactRoutre from "./Routers/contact.router";

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on this port ${process.env.BASE_URL}`);
});
// mongoose
//   .connect("mongodb://127.0.0.1:27017/BookWorm")
//   .then(() => console.log("DB connection established"))
//   .catch((err) => console.error(err));
app.use(
  UserRouter,
  categoryRouter,
  productRouter,
  addToCartRouter,
  userOrder,
  contactRoutre
);
async function main() {
  const uri = process.env.DATABASE;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch(() => {
      console.log("Could not connect to MongoDB!");
    });
}
main();
