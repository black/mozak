let socket,
    attention = meditation = blink = alphaLow = alphaHigh = betaLow = betaHigh = gammaLow = gammaHigh = delta = theta = 0,
    brainSignal = {};

socket = io.connect('http://localhost:3000');
socket.on('neurodata', function(data) {
 
    if (data.eSense) {
        brainSignal.attention = data.eSense.attention;
        brainSignal.meditation = data.eSense.meditation;
    }

    if (data.eegPower) { 
        brainSignal.alphaLow = data.eegPower.lowAlpha;
        brainSignal.alphaHigh = data.eegPower.highAlpha;
        brainSignal.betaLow = data.eegPower.lowBeta;
        brainSignal.betaHigh = data.eegPower.highBeta;
        brainSignal.gammaLow = data.eegPower.lowGamma;
        brainSignal.gammaHigh = data.eegPower.highGamma;
        brainSignal.delta = data.eegPower.delta;
        brainSignal.theta = data.eegPower.theta;
    }

    if (data.blinkStrength) {
        brainSignal.blink = data.blinkStrength;
    }else{
        brainSignal.blink = 0;
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