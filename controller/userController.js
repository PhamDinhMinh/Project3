import User from "../models/userModel.js";

export const loginController = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;
    console.log(phonenumber, password);
    const user = await User.findOne({
      phonenumber: phonenumber,
      password: password,
      verifyed: true,
    });
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).json({
        message: "TK mk không đúng",
      });
    }
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};

export const registerController = async (req, res) => {
  try {
    const newUser = new User({ ...req.body, verifyed: true });
    await newUser.save();
    res.status(200).send("User created success");
  } catch (error) {
    console.log(error);
  }
};
