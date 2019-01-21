const { Router } = require('express');
const router = Router();

router.get(
    '/',
    (req, res) => {
        console.log("Get route /");
        res.send('Hello from server');
    }
);

module.exports = router;