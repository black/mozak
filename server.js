var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    path = require('path'),
    server = app.listen(1300),
    __dirname = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-----------------------------
app.use(express.static('public'));
console.log("my server is running...on port 1300");