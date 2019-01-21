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


module.exports = router;