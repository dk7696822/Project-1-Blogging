const express = require("express");
const router = express.Router();
const AuthorController = require("../Controller/authorController");
const Blogcontroller = require("../Controller/Blogcontroller");
const Authenticate = require("../middleware/Auth");

router.post("/authors", AuthorController.createAuthor);

router.post("/blogs", Authenticate.authentication, Blogcontroller.createBlog);
router.get("/blogs", Authenticate.authentication, Blogcontroller.getBlog);
router.put(
  "/blogs/:blogId",
  Authenticate.authentication,
  Authenticate.authorisation,
  Blogcontroller.updateBlog
);
router.delete(
  "/blogs/:blogId",
  Authenticate.authentication,
  Authenticate.authorisation,
  Blogcontroller.deleteBlog
);
router.delete(
  "/blogs",
  Authenticate.authorisation,
  Blogcontroller.deleteBlogByQuery
);
router.post("/login", AuthorController.loginAuthor);

module.exports = router;
