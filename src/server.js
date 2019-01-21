const express = require('express');
const bodyParser = require('body-parser');

// Initialization
const app = express();

app.set('port', 3000);
const port = app.get('port');


// Form data manager Middleware
app.use(bodyParser.json());

// Manage the request
app.get(
    '/',
    (req, res) => {
        console.log("Get route /");
        //res.render('index');
        res.send('Hello from server');
    }
);


// Start the server 
app.listen(
    port,
    () => {
        console.log("Server listening on port " + port);
    }
);
