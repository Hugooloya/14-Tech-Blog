//Require the Express router.
const router = require('express').Router();

//Require Comments, Posts and User routes.
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');

//Use created routes.
router.use('/comment', commentRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);

//Export the router.
module.exports = router;
