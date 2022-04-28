const express = require('express');
const router = express.Router();

const {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  addPost,
  getAddPost,
  getPosts
} = require('../controller/post-controllers');

router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.get('/posts', getPosts);
router.get('/add-post', getAddPost);
router.post('/add-post', addPost);

module.exports = router;
