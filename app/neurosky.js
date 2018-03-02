const neurosky = require('node-neurosky'),
    socket = require('socket.io'),
    config = require('../app/config');

module.exports = (server) => {
    let io = socket(server);
    TGCclient = neurosky.createClient({
        appName: config.neuroskyAppName,
        appKey: config.neuroskyAppKey
    });
    // bind receive data event
    TGCclient.on('data', function(data) {
        io.sockets.emit('neurodata', data);
        console.log(data);
    });

    TGCclient.connect();
}