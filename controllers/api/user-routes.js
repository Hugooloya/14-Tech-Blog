const router = require('express').Router();
const { User } = require('../../models');

//Create user route and post.
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const addedUser = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = addedUser.id;
      req.session.loggedIn = true;
      req.session.username = addedUser.username;

      res.status(200).json(addedUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create login route for the existing user.
router.post('/login', async (req, res) => {
  try {
    console.log('this is the console log for username: ', req.body.username);
    const userLogin = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userLogin) {
      res
        .status(400)
        .json({ message: 'No user found with those credentials!' });
      return;
    }

    const correctPassword = userLogin.checkPassword(req.body.password);

    if (!correctPassword) {
      res
        .status(400)
        .json({ message: 'No user found with those credentials!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userLogin.id;
      req.session.loggedIn = true;
      req.session.username = userLogin.username;

      res.json({ userLogin, message: 'You are successfully logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user found with those credentials!' });
  }
});

//User log out.
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Export routes.
module.exports = router;
