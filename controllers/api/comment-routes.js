const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Require authorization from user to post a new comment.
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export the routes.
module.exports = router;
