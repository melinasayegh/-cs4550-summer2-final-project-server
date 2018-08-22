const unirest = require('unirest');

module.exports = function (app) {

    const recipeModel = require('../models/recipe/recipe.model.server');
    const userModel = require('../models/user/user.model.server');

    findAllRecipes = (req, res) => {
        recipeModel.findAllRecipes()
            .then(recipes => res.send(recipes))
    };

    findRecipeById = (req, res) => {
        recipeModel.findRecipeById(req.params.recipeId)
            .then(recipe => res.send(recipe))
    };

    findRecipesByTitle = (req, res) => {
        const modRecipeTitle = req.params.recipeTitle.replace(/%20/g, " ");
        recipeModel.findRecipesByTitle(modRecipeTitle)
            .then(recipes => res.send(recipes));
    }

    // create recipe
    createRecipe = (req, res) => {
        let recipe = req.body;
        recipeModel.createRecipe(recipe)
            .then((recipe) => userModel.addRecipeMyList(recipe.creator, recipe._id))
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
        recipeModel.updateRecipe(req.params.recipeId, req.body)
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

    getRecipeById = (req, res) => {
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + req.params.recipeId + "/information?includeNutrition=false")
            .header("X-Mashape-Key", "VsYAEwDWxwmshX990l6hWa2WtVNAp1f1zBojsnIEiyKW9hG6Sf")
            .header("Accept", "application/json")
            .end(recipe => {
                if (recipe !== undefined) {
                    res.send(recipe.body);
                }
            });

    };

    app.get('/api/recipe', findAllRecipes);
    app.get('/api/recipe/:recipeId', findRecipeById);
    app.post('/api/recipe', createRecipe);
    app.put ('/api/recipe/:recipeId', updateRecipe);
    app.delete('/api/recipe/:recipeId', deleteRecipe);
    app.get('/api/randomRecipe/:tag', getRandomRecipe);
    app.get('/api/recipe/:recipeId', getRecipeById);
};
