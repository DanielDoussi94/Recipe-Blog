const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController.js')


router.get('/', recipeController.homepage)
router.get('/categories', recipeController.exploreCategories)
router.get('/categories/:id', recipeController.exploreCategoriesByID)
router.get('/recipe/:id', recipeController.exploreRecipe)
router.post('/search', recipeController.searchRecipe)
router.get('/submit-recipe', recipeController.submitRecipe)
router.post('/submit-recipe', recipeController.submitRecipeOnPost)




module.exports = router;