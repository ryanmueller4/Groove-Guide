const router = require('express').Router();
const { Post, Comment, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  // find all posts
  try {
    const postData = await Post.findAll({
      order: [[ 'createdAt', 'ASC' ]],
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

  res.render('homepage', {
    isAuthenticated: req.session.isAuthenticated,
    posts,
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  // find one post by its `id` value
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