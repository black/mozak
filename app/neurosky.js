const neurosky = require('node-neurosky');

module.exports = (io) => {
    TGCclient = neurosky.createClient({
        appName:  "NodeNeuroSky",
        appKey: "0fc4141b4b45c675cc8d3a765b8d71c5bde9390" 
    });
    // bind receive data event
    TGCclient.on('data', function(data) {
        console.log(data);
        io.sockets.emit('neurodata', data);
        //  gutils.ps_publishMessage(ps_client, config.pubsub.signalsTopicId, data);
        //  gutils.bt_signal_insert(neurosky_signals_table, data);
    });

    TGCclient.connect();
}