const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');
const recipeModel = mongoose.model('RecipeModel', recipeSchema);

findAllRecipes = () =>
    recipeModel.find();

findAllRecipesForUser = userId =>
    recipeModel.find({creator: userId});

findRecipeById = (recipeId) =>
    recipeModel.findById(recipeId);

createRecipe = (recipe) =>
    recipeModel.create(recipe);

updateRecipe = (recipe) =>
    recipeModel.updateOne({_id: recipe._id}, {$set: recipe});

deleteRecipe = recipeId =>
    recipeModel.remove({_id: recipeId});

addReview = (review) =>
    recipeModel.update({_id: review.recipe}, {$push: {reviews: review._id}});

module.exports = {
    findAllRecipes,
    findAllRecipesForUser,
    findRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    addReview
};
