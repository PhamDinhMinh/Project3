import express from "express";
import {
  addBillController,
  getBillController,
} from "../controller/billController.js";

const billRouter = express.Router();

billRouter.post("/addbills", addBillController);
billRouter.get("/getbills", getBillController);

export default billRouter;
