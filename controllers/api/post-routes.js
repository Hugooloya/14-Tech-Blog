const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//Create the post.
router.post('/', withAuth, async (req, res) => {
  try {
    const addedPost = await Post.create({
      ...req.body,
      user_id: req.session.userId,
    });
    res.json(addedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Edit the post.
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatePost) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a post.
router.delete('/:id', withAuth, async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: 'No post found with this id!' });
    }
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export the routes.
module.exports = router;
