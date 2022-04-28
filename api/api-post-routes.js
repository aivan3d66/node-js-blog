const express = require('express');
const router = express.Router();

const {
  getPost,
  deletePost,
  editPost,
  addPost,
  getPosts
} = require('../controller/post-controllers');

// Get all posts
router.get('/api/posts', getPosts);
// Add new post
router.post('/api/add-post', addPost);
// Get post by ID
router.get('/api/posts/:id', getPost);
// Delete Post bt ID
router.delete('/api/posts/:id', deletePost);
// Update post by ID
router.put('/api/edit/:id', editPost);

module.exports = router;
