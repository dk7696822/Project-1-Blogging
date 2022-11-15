const mongoose = require("mongoose");
const validator = require("validator");
const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your Last Name"],
    },
    title: {
      type: String,
      required: [true, "Please provide the title"],
      enum: {
        values: ["Mr", "Mrs", "Miss"],
        message: "Title can be Mr, Mrs, or Miss",
      },
    },
    email: {
      type: String,
      required: [true, "Please provide your Email-ID"],
      unique: true,
      validation: [validator.isEmail, "Not a valid Email-ID"],
    },
    Password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password should be greater than 8 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("authors", authorSchema);
