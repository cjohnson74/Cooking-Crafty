const router = require('express').Router();
const { Recipe, User, Ingredient } = require('../../models');

router.get('/', async (req, res) => {
    try {
      res.render('search', {
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;