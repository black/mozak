 /*----------neurosky event---------------------------*/
var attention = 10;
var meditation = 10;
var blink = 10;
var poorSignalLevel = 0;
var k = 0;

// output a simple message if WebSocket is supported by browser
if ("WebSocket" in window) {
    console.log("WebSocket is supported by your Browser. Proceed.");
    $('#connect-controls').show();
}

// Let us open a web socket (should be a Websocket server running locally already)
var ws = new WebSocket("ws://127.0.0.1:8080");

// when WebSocket connection is opened, do this stuff
ws.onopen = function() {
    console.log('opened connection');
};

// whenever websocket server transmit a message, do this stuff
ws.onmessage = function(evt) {
    // parse the data (sent as string) into a standard JSON object (much easier to use)
    var data = JSON.parse(evt.data);

    // handle "eSense" data
    if (data.eSense) {
        attention = data.eSense.attention;
        meditation = data.eSense.meditation;
        $('#focus').text(attention);
        document.getElementById("focusProgress").style.width = attention+'%'; 
        $('#mediation').text(meditation);
        document.getElementById("mediProgress").style.width = meditation+'%';  
    }

    // handle "blinkStrength" data
    if (data.blinkStrength) {
        blink = data.blinkStrength;
        $('#blink').text(blink);
        document.getElementById("blinkProgress").style.width = blink+'%';   
        console.log('[blink] ' + blink);
    }

    // handle "poorSignal" data
    if (data.poorSignalLevel != null) {
        poorSignalLevel = parseInt(data.poorSignalLevel);
    }
};

// when websocket closes connection, do this stuff
ws.onclose = function() {
    // websocket is closed.
    console.log("Connection is closed...");
};


Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
 