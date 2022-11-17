const BlogModel = require("../Models/blogModel");
const AuthorModel = require("../Models/authorModel");
const { isValidObjectId } = require("mongoose");

exports.createBlog = async (req, res) => {
  try {
    if (req.authorId == req.body.author_id) {
      if (!isValidObjectId(req.body.author_id)) {
        return res.send("Author ID is not Valid");
      }
      const checkAuthor = await AuthorModel.findById(req.body.author_id);
      if (!checkAuthor) {
        return res
          .status(400)
          .json({ status: true, msg: "Author ID is invalid" });
      }
      const blog = await BlogModel.create(req.body);
      return res.status(201).json({
        status: true,
        data: blog,
      });
    } else {
      return res.status(400).send("You are not authorised to create a blog");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ status: false, error: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const listOfBlogs = await BlogModel.find({
        $and: [{ isDeleted: false }, { isPublished: true }],
      });
      if (!listOfBlogs) {
        return res.status(404).send("No such blog exist");
      }
      return res.status(200).send(listOfBlogs);
    } else {
      const blogs = await BlogModel.find({
        $and: [
          req.query,
          {
            isDeleted: false,
            isPublished: true,
          },
        ],
      });
      return res.status(200).send(blogs);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { category, title, body, tags, subCategory, isPublished } = req.body;
    if (!isValidObjectId(req.params.blogId)) {
      return res.status(400).send("Invalid ID");
    }
    const blog = await BlogModel.findOne({
      _id: req.params.blogId,
      isDeleted: false,
    });

    if (!blog) {
      return res.status(400).send("Blog either does not exist or is deleted");
    }
    if (tags && subCategory) {
      if (tags.length == 0 || subCategory.length == 0) {
        return res.status(400).send("Please do not leave the field empty");
      }
    }
    if (isPublished == true) {
      const updatedBlog = await BlogModel.findOneAndUpdate(
        { isDeleted: false, _id: req.params.blogId },

        {
          $set: {
            category,
            title,
            body,
            isPublished,
            updatedAt: Date.now(),
            publishedAt: Date.now(),
          },
          $push: { tags, subCategory },
        },
        { new: true },
        { runValidators: true }
      );
      return res.status(200).send(updatedBlog);
    } else {
      const updatedBlog = await BlogModel.findOneAndUpdate(
        { isDeleted: false, _id: req.params.blogId },

        {
          $set: {
            category,
            title,
            body,
            isPublished,
            updatedAt: Date.now(),
          },
          $push: { tags, subCategory },
        },
        { new: true }
      );
      return res.status(200).send(updatedBlog);
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.blogId)) {
      return res.status(400).send("Invalid ID");
    }

    const deleteBlog = await BlogModel.findOneAndUpdate(
      {
        _id: req.params.blogId,
        isDeleted: false,
      },
      {
        $set: {
          isDeleted: true,
          deletedAt: Date.now(),
        },
      }
    );
    if (!deleteBlog) {
      return res.status(400).send("Blog either does not exist or is deleted");
    }
    return res.status(204).send(deleteBlog);
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

exports.deleteBlogByQuery = async (req, res) => {
  try {
    if (Object.keys(req.query).length == 0) {
      return res.status(400).send("You must choose one category");
    }
    const { authorId, category, tags, subCategory } = req.query;
    const deleteBlog = await BlogModel.findOneAndUpdate(
      {
        $and: [
          { isDeleted: false },
          {
            $or: [
              { author_id: authorId },
              { category },
              { tags },
              { subCategory },
            ],
          },
        ],
      },
      {
        $set: {
          isDeleted: true,
          deletedAt: Date.now(),
        },
      },
      { new: true }
    );
    return res.status(204).send(deleteBlog);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
