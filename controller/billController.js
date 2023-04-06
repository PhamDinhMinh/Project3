import Bill from "../models/billModel.js";

export const getBillController = async (req, res) => {
  try {
    const bill = await Bill.find();
    res.send(bill);
  } catch (error) {
    console.log(error);
  }
};

export const addBillController = async (req, res) => {
  try {
    const newBills = new Bill(req.body);
    await newBills.save();
    res.send("Bill created success");
  } catch (error) {
    console.log(error);
  }
};
