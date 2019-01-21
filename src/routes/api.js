const { Router } = require('express');
const router = Router();

const mongoose = require("mongoose");
const dbUrl = "mongodb://user:password@localhost:27017/test";

mongoose.connect(
    dbUrl,
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

module.exports = router;