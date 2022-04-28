const express = require('express');
const router = express.Router();
const createPath = require('../helpers/create-path');

router.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    {name: 'YouTube', link: 'http://youtube.com/aivan3d66'},
    {name: 'Linkedin', link: 'https://www.linkedin.com/in/ivan-adamouski-55a421227/'},
    {name: 'GitHub', link: 'http://github.com/aivan3d66'},
  ];
  res.render(createPath('contacts'), {contacts, title});
});

module.exports = router;
