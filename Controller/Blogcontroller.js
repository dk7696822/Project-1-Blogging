const BlogModel = require("../Models/blogModel");
const AuthorModel = require("../Models/authorModel");

exports.createBlog = async (req, res) => {
  try {
    const checkAuthor = await AuthorModel.findById(req.body.authorId);
    if (!req.body.authorId) {
      res
        .status(400)
        .json({ status: true, msg: "Please input your Author ID " });
    }
    if (!checkAuthor) {
      res.status(400).json({ status: true, msg: "Author ID is invalid" });
    }
    const blog = await BlogModel.create(req.body);
    res.status(201).json({
      status: true,
      data: blog,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ status: false, error: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const data = req.query;
    const { author_id, Category, tags, SubCategory } = data;
    const saveData = await blogModel.find({
      $and: [{ isDeleted: false, isPublished: true }, data],
    });
    if (!saveData) {
      return res.status(404).send({ status: false, data: "Blog not found." });
    }
    return res.status(200).send({ status: true, message: saveData });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let data = req.body;
    let blogId = req.params.blogId;
    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, message: "Please enter data." });
    if (!blogId)
      return res
        .status(400)
        .send({ status: false, message: "blog Id is required." });
    let findBlogId = await blogModel.findById(blogId);
    if (findBlogId.isDeleted == true) {
      return res.status(400).send({ status: true, error: "Deleted Blog" });
    }
    let update = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).send({ status: true, msg: update });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    let checkblogId = await blogModel.findById(blogId);
    if (!checkblogId || checkblogId.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog is not available" });
    }
    let deleteBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true } }
    );
    return res.status(200).send("");
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};



// module.exports = { createBlog, getBlog, updateBlog, deleteBlog };

