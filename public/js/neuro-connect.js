let socket,
    attention = 0,
    meditation = 0,
    alphaLow = alphaHigh = betaLow = betaHigh = gammaLow = gammaHigh = delta = theta = 0,
    brainSignal = {},
    blink = 0;
socket = io.connect('http://localhost:3000');
socket.on('neurodata', function(data) {

    // handle "eSense" data
    if (data.eSense) {}

    if (data.eegPower) {
        // console.log(data.eegPower); 
        brainSignal.alphaLow = data.eegPower.lowAlpha;
        brainSignal.alphaHigh = data.eegPower.highAlpha;
        brainSignal.betaLow = data.eegPower.lowBeta;
        brainSignal.betaHigh = data.eegPower.highBeta;
        brainSignal.gammaLow = data.eegPower.lowGamma;
        brainSignal.gammaHigh = data.eegPower.highGamma;
        brainSignal.delta = data.eegPower.delta;
        brainSignal.theta = data.eegPower.theta;
    }

    // console.log(brainSignal);

    // handle "blinkStrength" data
    if (data.blinkStrength) {
        // blink = data.blinkStrength;
        // let blinkcol = "white";
        // let eyeVal = parseInt(map_range(blink, 0, 255, 0, 100));
        // brainProgress('#blinkStrength', eyeVal);
        // $('#signal_5').text(eyeVal);
        // brainProgress('#progress_5', eyeVal);
        // if (eyeVal > 15) {
        //     blinkcol = "rgba(102,211,43,1.0)";
        //     pressed = true;
        // } else blinkcol = "white";
    } else {
        // blink = 0;
    }

    // if (data.poorSignalLevel != null) {
    //     poorSignalLevel = parseInt(data.poorSignalLevel);
    //     if (poorSignalLevel > 0) { //|| data.status = "data.notscanning"
    //         $('#connetionSignal').css({
    //             display: 'none'
    //         });
    //         // console.log('not connected...');
    //     } else {
    //         console.log('connected...');
    //         $('#connetionSignal').fadeOut("slow");
    //     }
    // }
});

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function brainProgress(target, val) {
    $(target).css({
        width: val + '%',
        transition: 'width 1s ease-in-out'
    });
}