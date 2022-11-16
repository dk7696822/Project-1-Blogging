const express = require("express");
const router = express.Router();
const AuthorController = require("../Controller/authorController");
// const { dletedQueryParams } = require("../Controller/Blogcontroller")
const Blogcontroller = require("../Controller/Blogcontroller");
const Authenticate = require("../middleware/Auth");

router.post("/authors", AuthorController.createAuthor);

router.post("/blogs", Blogcontroller.createBlog);
router.get(
  "/getBlogs/:id",
  Authenticate.authentication,
  Blogcontroller.getBlog
);
router.put(
  "/blogs/:blogId",
  Authenticate.authentication,
  Blogcontroller.updateBlog
);
router.delete(
  "/blogs/:blogId",
  Authenticate.authentication,
  Blogcontroller.deleteBlog
);
router.post("/login", AuthorController.loginAuthor);
router.get("/listOfAuthors", AuthorController.getAllAuthors);
router.get(
  "/profile/:id",
  Authenticate.authentication,
  AuthorController.author
);
// router.delete("/blogger", dletedQueryParams)

module.exports = router;
