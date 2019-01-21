const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');

// Initialization
const app = express();

app.set('port', 3000);
const port = app.get('port');


// Form data manager Middleware
app.use(bodyParser.json());


// Manage the requests
app.use('/api', api);


// Start the server 
app.listen(
    port,
    () => {
        console.log("Server listening on port " + port);
    }
);
