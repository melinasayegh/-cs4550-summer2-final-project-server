const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');
const recipeModel = mongoose.model('RecipeModel', recipeSchema);

findAllRecipes = () =>
    recipeModel.find();

findAllRecipesForUser = userId =>
    recipeModel.find({creator: userId});

findRecipeById = (recipeId) => {
    let populateQuery = [{path:'user'}, {path:'reviews'}];
    return recipeModel.findById(recipeId)
        .populate(populateQuery)
        .exec();
}

createRecipe = (recipe) =>
    recipeModel.create(recipe);

updateRecipe = (recipeId, recipe) =>
    recipeModel.updateOne({_id: recipeId}, {$set: recipe});

deleteRecipe = recipeId =>
    recipeModel.remove({_id: recipeId});

addReview = (recipeId, reviewId) =>
    recipeModel.update({_id: recipeId}, {$push: {reviews: reviewId}});

module.exports = {
    findAllRecipes,
    findAllRecipesForUser,
    findRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    addReview
};
