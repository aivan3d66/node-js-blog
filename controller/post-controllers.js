const Post = require("../models/post");
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
};

const getPost = (req, res) => {
  const title = 'Post';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('post'), { post, title }))
    .catch((error) => handleError(res, error));
}

const deletePost = (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => handleError(res, error));
}

const getEditPost = (req, res) => {
  const title = 'Edit post';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { post, title }))
    .catch((error) => handleError(res, error));
}

const editPost = (req, res) => {
  const { title, author, text, picture } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(req.params.id, { title, author, text, picture })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => handleError(res, error));
}

const getPosts = (req, res) => {
  const title = 'Posts';
  Post
    .find()
    .sort({ createdAt: -1 })
    .then(posts => res.render(createPath('posts'), { posts, title }))
    .catch((error) => handleError(res, error));
}

const getAddPost = (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
}

const addPost = (req, res) => {
  const { title, author, text, picture } = req.body;
  const post = new Post({ title, author, text, picture });
  console.log(req.files)

  post
    .save()
    .then((result) => {
      if (req && req.files) {
        const images = [];

        if (req.files.picture) {
          const imgName = req.files.picture.name;
          const img = 'upload/' + imgName;

          images.push({ img, imgName });
        }
        console.log(images)

        res.redirect(200, '/posts', { images });
      } else {
        res.redirect(200, '/posts', { images: []});
      }
    })
    .catch((error) => handleError(res, error));
}

module.exports = {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost,
};
