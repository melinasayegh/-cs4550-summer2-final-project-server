const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');

const recipeModel = mongoose.model('RecipeModel', recipeSchema);
const userModel = require('../user/user.model.server');

findAllRecipes = () =>
    recipeModel.find();

findAllRecipesForUser = userId =>
    recipeModel.find({courseId: courseId});

findRecipeById = (sectionId) =>
    recipeModel.findById(sectionId);

createRecipe = (courseId, section) =>
    recipeModel.create(section);

deleteRecipe = sectionId =>
    recipeModel.deleteOne({_id: sectionId});

updateRecipe = (sectionId, newSection) =>
    recipeModel.updateOne({_id: sectionId}, {$set: {
            title: newSection.title,
            courseId: newSection.courseId,
            maxSeats: newSection.maxSeats,
            takenSeats: newSection.takenSeats,
        }});

module.exports = {
    findAllRecipes,
    findAllRecipesForUser,
    findRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe
};
