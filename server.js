const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Post = require('./models/post');
const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = `mongodb+srv://aivan3d66:kMRdkgpz7373@cluster0.idipw.mongodb.net/node-blog?retryWrites=true&w=majority`;
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

mongoose
  .connect(db)
  .then((res) => console.log('Connected to DB'))
  .catch(error => console.log(error))

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.use(methodOverride('__method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), {title});
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    {name: 'YouTube', link: 'http://youtube.com/aivan3d66'},
    {name: 'Linkedin', link: 'https://www.linkedin.com/in/ivan-adamouski-55a421227/'},
    {name: 'GitHub', link: 'http://github.com/aivan3d66'},
  ];
  res.render(createPath('contacts'), {contacts, title});
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  Post
    .findById(req.params.id)
    .then((posts) => res.render(createPath('post'), {title, post}))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), {title: 'Error'})
    })
});

app.delete('/post/:id', (req, res) => {
  const title = 'Post';
  Post
    .findByIdAndDelete(req.params.id)
    .then(result => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), {title: "Error"});
    })
})

app.get('/edit/:id', (req, res) => {
  const title = 'Edit post';
  Post
    .findById(req.params.id)
    .then(post => {
      res.render(createPath('edit-post'), {post, title})
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), {title: "Error"});
    })
})

app.get('/posts', (req, res) => {
  const title = 'Posts';
  Post
    .find()
    .sort({createdAt: -1})
    .then((posts) => res.render(createPath('posts'), {title, posts}))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), {title: 'Error'})
    })
});

app.post('/add-post', (req, res) => {
  const {title, author, text} = req.body;
  const post = new Post({title, author, text});
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), {title: 'Error'});
    })
});

app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), {title});
});

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), {title});
});
