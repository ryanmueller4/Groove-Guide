const router = require('express').Router();
const {Post, Comment} = require('../models');

router.get('/', async (req, res) => {
  if (!req.session || !req.session.isAuthenticated) {
    res.redirect('/login');
    return;
  }

  try {
    // Get all users, sorted by name
    // const userData = await User.findAll({
      //  attributes: { exclude: ['password'] },
      // order: [['name', 'ASC']],
    // });

    // Serialize user data so templates can read it
    // const users = userData.map((project) => project.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', {isAuthenticated: req.session.isAuthenticated});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  // find one post by its `id` value
  console.log(req.params.id)
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });
    console.log(postData)

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    const post = postData.get({plain: true})

    res.render('post', post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
      res.redirect('/');
      return;
  }

  res.render('login');
});

module.exports = router;