const express = require('express'),
    bodyParser = require('body-parser'),
    socket = require('socket.io'),
    app = express(),
    server = app.listen(3000, () => {
        console.log("NUOS Registration running on 3000...");
    }),
    io = socket(server);

require('./app/neurosky')(io);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

console.log('Server running on the port 3000 ...');