const express = require('express');
const router = express.Router();
const { createAuthor } = require('../Controller/authorController');
const { createBlog } = require('../Controller/Blogcontroller');
const { getBlog } = require('../Controller/Blogcontroller');
const { dletedQueryParams } = require("../Controller/Blogcontroller")
const Blogcontroller = require("../Controller/Blogcontroller")


router.post('/authors', createAuthor);
router.post('/blogs', createBlog);
router.get('/getBlogs', getBlog);
router.put('/blogs/:blogId', Blogcontroller.updateBlog);
router.delete('/blogs/:blogId', Blogcontroller.deleteBlog);
router.delete("/blogger", dletedQueryParams)

module.exports = router;