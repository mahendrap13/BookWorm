import express from "express";
import {
  addContactdetails,
  getContactdetails,
} from "../Controllers/contact.controller";

const contactRoutre = express.Router();

contactRoutre.post("/add-contactdetails", addContactdetails);
contactRoutre.get("/get-contactdetails", getContactdetails);

export default contactRoutre;
