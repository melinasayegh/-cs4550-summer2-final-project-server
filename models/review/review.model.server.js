const mongoose = require('mongoose');
const reviewSchema = require('./review.schema.server');
const reviewModel = mongoose.model('ReviewModel', reviewSchema);

findAllReviews = () =>
    reviewModel.find();

findReviewById = reviewId => {
    let populateQuery = [{path:'user'}, {path:'recipe'}];
    return reviewModel.findById({_id: reviewId})
        .populate(populateQuery)
        .exec();
};

findReviewsForUser = (userId) => {
    let populateQuery = [{path: 'user'}, {path: 'recipe'}];
    reviewModel.find({user: userId})
        .populate(populateQuery)
        .exec();
};

findReviewsForRecipe = (recipeId) => {
    let populateQuery = [{path: 'user'}, {path: 'recipe'}];
    reviewModel.find({recipe: recipeId})
        .populate(populateQuery)
        .exec();
};

findReviewByUserAndRecipe = (userId, recipeId) =>
    reviewModel.find({user: userId, recipe: recipeId});

createReview = (review) =>
    reviewModel.create(review);

deleteReview = (reviewId) =>
    reviewModel.remove({_id: reviewId});

updateReview = (review) =>
    reviewModel.update({_id: review._id}, {$set: review});

module.exports = {
    findAllReviews,
    findReviewById,
    findReviewsForUser,
    findReviewsForRecipe,
    findReviewByUserAndRecipe,
    createReview,
    deleteReview,
    updateReview
};