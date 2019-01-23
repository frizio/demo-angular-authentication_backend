const { Router } = require('express');
const router = Router();
const mongoose = require("mongoose");
const User = require('../models/user');
const jwt = require("jsonwebtoken");

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

const secretkey = "secretkey";

function generateToken(id) {
    console.log("Generate the JWT payload and token");
    let payload = {subject: id};
    let token = jwt.sign(payload, secretkey);
    return { token } ;
}

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    } 
    let token = req.headers.authorization.split(" ")[1];
    if (token == 'null') {
        return res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, secretkey);
    if (payload == 'null') {
        return res.status(401).send("Unauthorized request");
    }
    req.userId = payload.subject;
    next();
}

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
                    let token = generateToken(registredUser._id);
                    res.status(200).send(token);
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
                            let token = generateToken(user._id);
                            res.status(200).send(token); 
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
                "name": "Auto Expo 1",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "2",
                "name": "Auto Expo 2",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "3",
                "name": "Auto Expo 3",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "4",
                "name": "Auto Expo 4",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "5",
                "name": "Auto Expo 5",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "6",
                "name": "Auto Expo 6",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            }
        ];
        res.json(events)
    }
);

router.get(
    '/special', 
    verifyToken,
    (req,res) => {
        let events = [
            {
                "_id": "1",
                "name": "Auto Expo special A",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "2",
                "name": "Auto Expo special B",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "3",
                "name": "Auto Expo special C",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "4",
                "name": "Auto Expo special D",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "5",
                "name": "Auto Expo special E",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "6",
                "name": "Auto Expo special F",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            }
        ];
        res.json(events)
    }
);

module.exports = router;