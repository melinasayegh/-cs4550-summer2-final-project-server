const mongoose = require('mongoose');
const reviewSchema = require('./review.schema.server');
const reviewModel = mongoose.model('ReviewModel', reviewSchema);

findAllReviews = () =>
    reviewModel.find();

findReviewById = reviewId =>
    reviewModel.findById({_id: reviewId});

findReviewsForUser = (userId) =>
    reviewModel.find({user: userId});

findReviewsForRecipe = (recipeId) =>
    reviewModel.find({recipe: recipeId});

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