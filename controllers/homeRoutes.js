const router = require('express').Router();
const { Recipe, User, Ingredient, RecipeIngredient } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const recipesData = await Recipe.findAll({
      limit: 10,
      include: [
        {
          model: Ingredient,
          through: {
            model: RecipeIngredient,
          },
        },
      ],
    });
    const recipes = recipesData.map((recipe) => recipe.get({ plain: true }));
    // console.log(recipes);
    // console.log(recipes[0].ingredients);
    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Ingredient,
          attributes: ['name'],
        },
      ],
    });

    const recipes = recipeData.get({ plain: true });

    res.render('recipes', {
      ...recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/saved', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });
    console.log(userData);
    res.render('savedrecipes', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/saved');
    return;
  }

  res.render('login');
});

module.exports = router;