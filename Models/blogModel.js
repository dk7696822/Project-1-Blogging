const mongoose = require("mongoose");
const validator = require("validator");
let ObjectId = mongoose.Schema.Types.ObjectId;

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the Blog"],
    },
    body: {
      type: String,
      required: [true, "Please provide the body"],
    },
    tags: {
      type: [String],
      required: true,
    },
    Category: {
      type: String,
      required: [true, "Please mention the category"],
    },
    author_id: {
      type: ObjectId,
      ref: "authors",
      required: [true, "Please provide the author ID"],
      validation: [validator.isMongoId, "Author ID is not valid"],
    },
    SubCategory: {
      type: [String],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blogs", BlogSchema);
