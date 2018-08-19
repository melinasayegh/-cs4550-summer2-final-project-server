const unirest = require('unirest');

module.exports = function (app) {

    app.get('/api/randomRecipe/:tag', getRandomRecipe);
    app.get('/api/recipe/:recipeId', getRecipeById);
    const recipeModel = require('../models/recipe/recipe.model.server');

    findAllRecipes = (req, res) => {
        recipeModel.findAllRecipes()
            .then(quizzes => res.send(quizzes))
    };

    findRecipeById = (req, res) => {
        recipeModel.findRecipeById(req.params.qid)
            .then(quiz => res.send(quiz))
    };

    // create recipe
    createRecipe = (req, res) => {
        recipeModel.createRecipe(req.body)
            .then(recipe => res.send(recipe))
    };

    // delete recipe
    // deletes all reviews of this recipe
    deleteRecipe = (req, res) => {
        recipeModel.deleteRecipe(req.params.recipeId)
            .then(status => res.send(status))
    };

    // update recipe
    updateRecipe = (req, res) => {
        recipeModel.updateRecipe(req.params.qid, req.body)
            .then(status => res.send(status))
    };

    getRandomRecipe = (req, res) => {
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=" + req.params.tag)
            .header("X-Mashape-Key", "VsYAEwDWxwmshX990l6hWa2WtVNAp1f1zBojsnIEiyKW9hG6Sf")
            .header("Accept", "application/json")
            .end(recipes => {
                if (recipes !== undefined) {
                    res.send(recipes.body.recipes[0]);
                }
            });
    };

    function getRecipeById(req, res) {
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + req.params.recipeId + "/information?includeNutrition=false")
            .header("X-Mashape-Key", "VsYAEwDWxwmshX990l6hWa2WtVNAp1f1zBojsnIEiyKW9hG6Sf")
            .header("Accept", "application/json")
            .end(recipe => {
                if (recipe !== null) {
                    res.send(recipe.body);
                }
            });

    }

};
    app.get('/api/recipe', findAllRecipes);
    app.get('/api/recipe/:recipeId', findRecipeById);
    app.post('/api/recipe', createRecipe);
    app.put ('/api/recipe/:recipeId', updateRecipe);
    app.delete('/api/recipe/:recipeId', deleteRecipe);
    app.get('/api/randomRecipe/:tag', getRandomRecipe);
};
