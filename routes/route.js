const express = require('express');
const router = express.Router();
const AuthorController = require('../Controller/authorController')
// const { dletedQueryParams } = require("../Controller/Blogcontroller")
const Blogcontroller = require("../Controller/Blogcontroller")
const Authenticate = require('../middleware/Auth')

router.post('/authors', AuthorController.createAuthor);
router.post('/blogs', Blogcontroller.createBlog);
router.get('/getBlogs', Blogcontroller.getBlog);
router.put('/blogs/:blogId', Blogcontroller.updateBlog);
router.delete('/blogs/:blogId', Blogcontroller.deleteBlog);
router.post('/login',  AuthorController.loginAuthor)
router.get('/listOfAuthors', Authenticate.authentication,  AuthorController.getAllAuthors)
router.get('/profile/:id', Authenticate.authentication, AuthorController.author)
// router.delete("/blogger", dletedQueryParams)

module.exports = router;