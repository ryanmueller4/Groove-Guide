const router = require('express').Router();
const { Comment, Post } = require('../../models');

router.get('/', async (req, res) => {
  // find all comment
  try {
    const commentData = await Comment.findAll({
      include: [{ model: Post }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.get('/:id', async (req, res) => {
  // find one comment by its `id` value
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{ model: Post }],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new comment
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a comment by its `id` value
  try {
    const commentData = await Comment.update(req.body,{
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.delete('/:id', async (req, res) => {
  // delete a comment by its `id` value
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  module.exports = router;