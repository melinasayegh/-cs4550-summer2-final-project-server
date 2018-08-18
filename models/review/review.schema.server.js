const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    text: String,
    createdAt: Date,
    updatedAt: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecipeModel'
    }
}, {collection: 'review'});

module.exports = reviewSchema;