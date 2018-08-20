const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

findAllUsers = () =>
    userModel.find();

findUserById = userId => {
    let populateQuery = [{path:'myRecipes'}, {path:'favoriteRecipes'}, {path:'myReviews'}];

    return userModel.findById({_id: userId})
        .populate(populateQuery)
        .exec();
};

findUserByCredentials = (username, password) =>
    userModel.findOne({username: username, password: password});

findUserByUsername = (username) => {
    let populateQuery = [{path: 'myRecipes'}, {path: 'favoriteRecipes'}, {path: 'myReviews'}];
    return userModel.findOne({username: username})
        .populate(populateQuery)
        .exec();
};

createUser = (user) =>
    userModel.create(user);

deleteUser = (userId) =>
    userModel.remove({_id: userId});

updateUser = (user) =>
    userModel.findOneAndUpdate({username: user.username},
        {$set: {firstName: user.firstName,
                lastName: user.lastName,
                email: user.email}
        },
        {new: true});

addReview = (userId, reviewId) =>
    userModel.update({_id: userId}, {$push: {reviews: reviewId}});

addRecipeMyList = (userId, recipeId) =>
    userModel.update({_id: userId}, {$push: {reviews: recipeId}});

deleteUserByCredentials = (username, password) => {
    userModel.remove({username: username, password: password});

};

module.exports = {
    findAllUsers,
    findUserById,
    findUserByCredentials,
    findUserByUsername,
    createUser,
    deleteUser,
    updateUser,
    addReview,
    addRecipeMyList
};