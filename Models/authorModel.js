const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true
    },
  title: {
    type: String,
    required: true,
    enum: ["Mr", "Mrs", "Miss"]
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true,
  }
}, {timestamps: true});

module.exports = mongoose.model("authors", authorSchema);