const unirest = require('unirest');

module.exports = function (app) {

    app.get('/api/randomRecipe', getRandomRecipe);

    function getRandomRecipe(req, res) {
         unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=dessert")
            .header("X-Mashape-Key", "VsYAEwDWxwmshX990l6hWa2WtVNAp1f1zBojsnIEiyKW9hG6Sf")
            .header("Accept", "application/json")
            .end(function (result) {
                res.send(result.body)
            });
    }

};
