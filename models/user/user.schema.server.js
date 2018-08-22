const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: Boolean,
    isChef: Boolean,
    myRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecipeModel'}],
    favoriteRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecipeModel'}],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReviewModel'}],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'}],
}, {collection: 'user'});

module.exports = userSchema;
