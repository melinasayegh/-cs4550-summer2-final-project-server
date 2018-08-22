
module.exports = app => {

    const reviewModel = require('../models/review/review.model.server');
    const recipeModel = require('../models/recipe/recipe.model.server');
    const userModel = require('../models/user/user.model.server');


    findAllReviews = (req, res) => {
        reviewModel.findAllReviews()
            .then(reviews => res.send(reviews))
    };

    findAllReviewsForRecipe = (req, res) => {
        reviewModel.findReviewsForRecipe(req.params.recipeId)
            .then(reviews => res.send(reviews))
    };

    findAllReviewsForUser = (req, res) => {
        let currentUser = req.session.currentUser;
        if (currentUser !== undefined) {
            let userId = currentUser._id;
            return reviewModel.findReviewsForUser(userId)
                .then((reviews) => res.send(reviews));
        }
    };

    findReviewById = (req, res) => {
        reviewModel.findReviewById(req.params.reviewId)
            .then(review => res.send(review))
    };

    // create recipe
    createReview = (req, res) => {
        let currentUser = req.session.currentUser;
        reviewModel.createReview(req.body)
            .then((review) => {
                recipeModel.addReview(req.params.recipeId, review)
                    .then(response => console.log(response));
                userModel.addReview(currentUser._id, review)
                    .then(response => console.log(response));
            }).then(review => res.send(review))
    };

    // delete recipe
    // deletes all reviews of this recipe
    deleteReview = (req, res) => {
        reviewModel.deleteReview(req.params.reviewId)
            .then(status => res.send(status))
    };

    // update recipe
    updateReview = (req, res) => {
        reviewModel.updateReview(req.params.recipeId, req.body)
            .then(status => res.send(status))
    };

    app.get('/api/review', findAllReviews);
    app.get('/api/recipe/:recipeId/review', findAllReviewsForRecipe);
    app.get('/api/review/user', findAllReviewsForUser);
    app.get('/api/recipe/:recipeId/review/:reviewId', findReviewById);
    app.post('/api/recipe/:recipeId/review', createReview);
    app.put ('/api/recipe/:recipeId/review/:reviewId', updateReview);
    app.delete('/api/review/:reviewId', deleteReview);
};

