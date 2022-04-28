const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contacts-routes');

const app = express();
const PORT = 3000;
const db = `mongodb+srv://aivan3d66:123qwe@cluster0.idipw.mongodb.net/node-blog?retryWrites=true&w=majority`;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.set('view engine', 'ejs');

mongoose
  .connect(db)
  .then((res) => console.log('Connected to DB'))
  .catch(error => console.log(error))

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`)
})

app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('styles'));
app.use(methodOverride('_method'));
app.use(contactRoutes);
app.use(postRoutes);

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), {title});
});
