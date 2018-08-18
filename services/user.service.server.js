module.exports = app => {

    const userModel = require('../models/user/user.model.server');

    // creates a new user in the mongo database and logs them in
    register = (req, res) =>  {
        const newUser = req.body;
        userModel.findUserByUsername(newUser.username)
            .then((user) => {
                if(user === null) {
                    return userModel.createUser(newUser)
                } else {
                    return res.sendStatus(401);
                }
            })
            .then((user) =>  {
                req.session['currentUser'] = user;
                res.sendStatus(200);
            });
    };

    // finds the user in the mongo database and logs them in
    login = (req, res) => {
        console.log("here");
        const username = req.body.username;
        const password = req.body.password;
        userModel.findUserByCredentials(username, password)
            .then(user => {
                if (user) {
                    req.session['currentUser'] = user;
                    res.send(user);
                } else {
                    // 404 not found
                    return res.sendStatus(404);
                }
            });
    };

    // logs out the currently logged in user
    logout = (req, res) => {
        req.session.destroy();
        res.send(200);
    };

    // find all Users
    findAllUsers = (req, res) =>
        userModel.findAllUsers()
            .then(users => {
                res.send(users);
            });

    findUserById = (req, res) => {
        const id = req.params['userId'];
        userModel.findUserById(id)
            .then(user => {
                res.json(user);
            })
    };


    currentUser = (req, res) => {
        const currentUser = req.session['currentUser'];
        if(currentUser) {
            userModel.findUserById(currentUser._id)
                .then(user => {
                    return res.send(user)
                });
        } else {
            return res.sendStatus(403);
        }
    };

    // retrieves the profile of the currently logged in user
    profile = (req, res) => {
        const currentUser = req.session['currentUser'];
        userModel.findUserById(currentUser._id)
            .then(user => {
                res.json(user);
            })
    };

    // updates the profile of the currently logged in user
    updateUser = (req, res) => {
        const newUser = req.body;
        userModel.updateUser(newUser)
            .then(response => res.sendStatus(200));
    };

    // removes the profile of the currently logged in user
    deleteProfile = (req, res) => {
        const currentUser = req.session['currentUser'];
        userModel.deleteUser(currentUser)
            .then(() => res.send(200));
    };

    app.post('/api/register', register);
    app.post('/api/login',    login);
    app.post('/api/logout',   logout);
    app.get ('/api/user',     findAllUsers);
    app.get ('/api/currentUser', currentUser);
    app.get ('/api/profile', profile);
    app.put ('/api/profile', updateUser);
    app.delete('/api/profile', deleteProfile);
};
