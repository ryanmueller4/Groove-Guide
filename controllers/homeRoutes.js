const router = require('express').Router();
const { Post, Comment, User} = require('../models');

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

router.get('/post', async (req, res) => {
  // find all posts
  if (!req.session || !req.session.isAuthenticated) {
    res.redirect('/login');
    return;
  }

  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          attributes: ['comment_body']
        },
      ],
    });

  if (!postData) {
    res.status(404).json({ message: 'No posts found!' });
    return;
  }
    
  const posts = postData.map((post) =>
    post.get({ plain: true })
  );

  console.log(posts)
  res.render('postList', {
    posts,
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  // find one post by its `id` value
  if (!req.session || !req.session.isAuthenticated) {
    res.redirect('/login');
    return;
  }

  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          attributes: ['comment_body']
        },
      ],
    });

  if (!postData) {
    res.status(404).json({ message: 'No post found with that id!' });
    return;
  }
  
  const post = postData.get({plain: true})

  console.log(post)
  res.render('singlePost', {
    post,
  });
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