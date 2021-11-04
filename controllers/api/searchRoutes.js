const router = require('express').Router();
const { Recipe, Ingredient } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const recipesData = await Recipe.findAll({
        include: [
          {
            model: Ingredient,
            attributes: ['name'],
          },
        ],
      });

      const recipes = recipesData.map((recipe) => recipe.get({ plain: true }));

      res.render('search', {
        recipes, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;