import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phonenumber: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    verifyed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);
export default User;
