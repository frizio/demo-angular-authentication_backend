const express = require('express');
const bodyParser = require('body-parser');
const { Router } = require('express');

// Initialization
const app = express();

app.set('port', 3000);
const port = app.get('port');


// Form data manager Middleware
app.use(bodyParser.json());


// Manage the requests
const router = Router();
router.get(
    '/',
    (req, res) => {
        console.log("Get route /");
        //res.render('index');
        res.send('Hello from server');
    }
);
app.use('/api', router);


// Start the server 
app.listen(
    port,
    () => {
        console.log("Server listening on port " + port);
    }
);
