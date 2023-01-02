const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

//GET all posts for the individual.
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(posts);
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.redirect('login');
  }
});

//Create the new post and render the form.
router.get('/create', withAuth, (req, res) => {
  res.render('new-post', {
    loggedIn: req.session.loggedIn,
  });
});

//Update the user post using id and render the form.
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-posts', {
        post,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
