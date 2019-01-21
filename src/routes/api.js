const { Router } = require('express');
const router = Router();
const mongoose = require("mongoose");
const User = require('../models/user');

const dbUrl = "mongodb://user:password@localhost:27017/test";
const dbOptions = { 
    useNewUrlParser: true
};

mongoose.connect(
    dbUrl,
    dbOptions,
    (err) => {
        if (err) {
            console.log("There is an Error:\n" + err);
        }
        else {
            console.log("Application connected to mongodb");
        }
    }
);



router.get(
    '/',
    (req, res) => {
        console.log("Get route /");
        res.send('Hello from server');
    }
);

router.post(
    '/register',
    (req, res) => {
        console.log("Post on route /register");
        let userData = req.body;
        let user = new User(userData);
        // Saving
        user.save(
            (err, registredUser) => {
                if (err) {
                    console.log("There is an error");
                    console.log(err);
                } else {
                    console.log("User registed correctly");
                    res.status(200).send(registredUser);
                }
            }
        );
    }
);

router.post(
    '/login',
    (req, res) => {
        console.log("Post on route /login");
        let userData = req.body;
        User.findOne(
            // Check username
            {email: userData.email},
            (err, user) => {
                if (err) {
                    console.log("There is an error");
                    console.log(err);
                } else {
                    if (!user) {
                        console.log("The User is unknowing");
                        res.status(401).send("Username invalid"); 
                    } else {
                        // The user exist... Check the password
                        if (user.password != userData.password ) {
                            console.log("The password is invalid");
                            res.status(401).send("Password invalid"); 
                        } else {
                            console.log("Login user in the system");
                            res.status(200).send(user); 
                        }
                    }
                }
            }
        );
    }
);

router.get(
    '/events', 
    (req,res) => {
        let events = [
            {
                "_id": "1",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "2",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "3",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "4",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "5",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "6",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            }
        ];
        res.json(events)
    }
);

router.get(
    '/special', 
    (req,res) => {
        let events = [
            {
                "_id": "1",
                "name": "Auto Expo special",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "2",
                "name": "Auto Expo special",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "3",
                "name": "Auto Expo special",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "4",
                "name": "Auto Expo special",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "5",
                "name": "Auto Expo special",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "6",
                "name": "Auto Expo special",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            }
        ];
        res.json(events)
    }
);

module.exports = router;