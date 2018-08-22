const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');
const recipeModel = mongoose.model('RecipeModel', recipeSchema);

findAllRecipes = () =>
    recipeModel.find();

findAllRecipesForUser = userId =>
    recipeModel.find({creator: userId});

findRecipeById = (recipeId) => {
    let populateQuery = [{path:'creator'}, {path:'reviews'}, {path:'user'}];
    return recipeModel.findById(recipeId)
        .populate(populateQuery, populate({path:'user'}))
        .exec();
}

findRecipesByTitle = (recipeTitle) => {
    return recipeModel.find({title: recipeTitle});
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
    findRecipesByTitle,
    findAllRecipesForUser,
    findRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    addReview
};
