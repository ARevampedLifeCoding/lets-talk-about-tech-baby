const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res, next) => {
  try {
    const newPosts = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPosts);
  } 
  catch (err) {
    res.status(400).json(err);
  }
}
);

router.delete('/:id', withAuth, async (req, res, next) => {
  try {
    const postsData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postsData) {
      res.status(404).json({ message: 'No posts found with this id!' });
      return;
    }

    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
