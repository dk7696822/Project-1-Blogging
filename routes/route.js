const express = require('express');
const router = express.Router();
const { createAuthor } = require('../Controller/authorController');
const { createBlog } = require('../Controller/Blogcontroller');
const { getBlog } = require('../Controller/Blogcontroller');

router.post('/authors', createAuthor);
router.post('/blogs', createBlog);
router.get('/getBlogs', getBlog);

module.exports = router;