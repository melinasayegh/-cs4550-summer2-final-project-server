module.exports = app => {

    const userModel = require('../models/user/user.model.server');

    // creates a new user in the mongo database and logs them in
    register = (req, res) =>  {
        const newUser = req.body;
        userModel.findUserByUsername(newUser.username)
            .then((user) => {
                if(user === null) {
                    userModel.createUser(newUser)
                        .then((user) =>  {
                            req.session['currentUser'] = user;
                            req.session.cookie._expires = new Date(Date.now() + (30 * 60 * 1000));
                            res.sendStatus(200);
                        });
                } else {
                    res.sendStatus(401);
                }
            })
    };

    // finds the user in the mongo database and logs them in
    login = (req, res) => {
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
                res.send(user);
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
        userModel.findUserById(req.params['userId'])
            .then(user => res.json(user))
    };

    updateUser = (req, res) => {
        var user = req.body;
        console.log(req.body);
        userModel.updateUser(user)
            .then(obj => {
                console.log(obj);
                if (obj.nModified > 0) {
                    this.findUserById(currentUser._id).then((user) => {
                        req.session['currentUser'] = user;
                        res.send(user);
                    })
                } else {
                    res.sendStatus(402);
                }
            });
    };

    // removes the profile of the currently logged in user
    deleteProfile = (req, res) => {
        const currentUser = req.session['currentUser'];
        userModel.deleteUser(currentUser._id)
            .then(() => res.send(200));
    };

    //for ADMIN use
    // update user with id
    updateUserById = (req, res) => {
        let userId = req.params.userId;
        let newUser = req.body;
        if (userId !== undefined) {
            userModel.adminUpdatesUser(userId, newUser)
                .then(obj => {
                    console.log(obj);
                    if (obj.nModified > 0) {
                        this.findUserById(userId).then((user) => res.send(user));
                    } else {
                        res.sendStatus(401);
                    }
                })
        } else {
            res.sendStatus(402);
        }
    };

    //for ADMIN use
    // removes the profile with id
    deleteUser = (req, res) => {
        let userId = req.params.userId;
        userModel.deleteUser(userId)
            .then(() => res.send(200), () => res.send(400));
    };

    // creates a new user in the mongo database and logs them in
    createUser = (req, res) =>  {
        const newUser = req.body;
        userModel.findUserByUsername(newUser.username)
            .then((user) => {
                if(user === null) {
                    userModel.createUser(newUser)
                        .then((user) =>  {
                            res.sendStatus(200);
                        });
                } else {
                    res.sendStatus(401);
                }
            })
    };

    app.post('/api/register', register);
    app.post('/api/login',    login);
    app.post('/api/logout',   logout);
    app.get ('/api/user',     findAllUsers);
    app.get ('/api/user/:userId', findUserById);
    app.get ('/api/currentUser', currentUser);
    app.get ('/api/profile/:userId', profile);
    app.put ('/api/user/update', updateUser);
    app.delete('/api/user/delete', deleteProfile);
    app.put ('/api/admin/user/update/:userId', updateUserById);
    app.delete ('/api/admin/user/delete/:userId', deleteUser);
    app.post ('/api/admin/user/create', createUser);

};
