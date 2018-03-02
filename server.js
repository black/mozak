const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = app.listen(3000);

require('./app/neurosky')(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

console.log('Server running on the port 3000 ...');