const router = require('express').Router();
const { Recipe , User } = require('../models');

router.get('/', async (req, res) => {
    try {
      const recipesData = await Recipe.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      const recipes = recipesData.map((project) => project.get({ plain: true }));

      res.render('homepage', { 
        recipes, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/recipes');
      return;
    }

    res.render('login');
});

module.exports = router;