const unirest = require('unirest');

module.exports = function (app) {

    app.get('/api/randomRecipe/:tag', getRandomRecipe);

    function getRandomRecipe(req, res) {
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=" + req.params.tag)
            .header("X-Mashape-Key", "VsYAEwDWxwmshX990l6hWa2WtVNAp1f1zBojsnIEiyKW9hG6Sf")
            .header("Accept", "application/json")
            .end(recipes => {
                if (recipes !== null) {
                    res.send(recipes.body.recipes[0])
                }
            });
    }

};
