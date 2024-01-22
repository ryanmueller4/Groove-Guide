const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment_body'],
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
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment_body'],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('singlePost', {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/createpost', withAuth, (req, res) => {
  res.render('createpost');
});

router.get('/newposts', withAuth, async (req, res) => {

  try {
    const userPostsData = await Post.findAll({
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment_body'],
        },
      ],
    });

    if (!userPostsData) {
      res.status(404).json({ message: 'No posts found!' });
      return;
    }

    const userPosts = userPostsData.map((post) =>
      post.get({ plain: true })
    );

    const result = userPosts.filter(X => X.user.name == 'username1');

    res.render('myposts', {
      isAuthenticated: req.session.isAuthenticated,
      result,
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
