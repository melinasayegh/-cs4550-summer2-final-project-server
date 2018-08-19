const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: String,
    image: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    createdAt: Date,
    updatedAt: Date,
    ingredients: String,
    directions: String,
    prepTime: Number,
    cookTime: Number,
    numServings: Number,
    tags: [{
        type: String,
        enum: ['VEGAN', 'VEGAN', 'DIABETIC', 'GLUTEN-FREE', 'LOW-CALORIE', 'GUILTY-PLEASURE'],
        default: 'VEGETARIAN'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReviewModel'
    }]

}, {collection: 'recipe'});

module.exports = recipeSchema;
