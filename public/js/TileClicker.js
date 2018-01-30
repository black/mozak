/*--------mouse cursor movement---------------*/
var rectW, rectH, rindex;
var k = 0;
var move;
var U, V;
var df = 2;
var t = 0.0;

function setup() {
    var canvas = createCanvas(150, 150);
    canvas.parent('myCanvas');
    rectW = rectH = 50;
    rindex = -1;
    U = new createVector(width / 2, height / 2);
    V = new createVector(0, 0);
    move = false;
}

function draw() {
    background(255);
    drawTiles();
    if (blink > 20) k++;
    ellipse(U.x, U.y, 10, 10);
    line(U.x, U.y, V.x, V.y);
    if (k == 0) {
        lineScanner();
        t = 0;
        $('#state').text("ROTATIING");
    }
    if (k == 1) {
        moveCircle();
        if (t < 1.0) {
            t += 0.0005;
        }
        $('#state').text("MOVING");
    }

    if (k > 1) {
        k = 0;
        $('#state').text("CLICKED");
        checkTiles(U.x, U.y);
    }

    blink = 0;
}

function lineScanner() {
    if (V.y == 0 && V.x < width) {
        V.x += df;
    } else if (V.x == width && V.y < height) {
        V.y += df;
    } else if (V.y == height && 0 < V.x) {
        V.x -= df;
    } else if (V.x == 0 && 0 < V.y) {
        V.y -= df;
    }
}

function moveCircle() {
    U.x = U.x + t * (V.x - U.x);
    U.y = U.y + t * (V.y - U.y);
    console.log(t);
}

function drawTiles() {
    noFill();
    stroke(0, 100);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            rect(i * rectW, j * rectH, rectW, rectH);
        }
    }
}

function checkTiles(cx, cy) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var index = i+j*3;
            if (dist(cx, cy, i * rectW+rectW/2, j * rectH+rectH/2) < 30) {
                eyeClick(index); 
            }
        }
    }
}

function eyeClick(getIndex) {
    if (getIndex == 0) launchDiv(1);
    else if (getIndex == 1) launchDiv(2);
    else if (getIndex == 2) launchDiv(3);
    else if (getIndex == 3) launchDiv(4);
    else if (getIndex == 4) launchDiv(5);
    else if (getIndex == 5) launchDiv(6);
    else if (getIndex == 6) launchDiv(7);
    else if (getIndex == 7) launchDiv(8);
    else if (getIndex == 8) launchDiv(9);
}

function launchDiv(index) {
    document.getElementById('myModal').style.display = "block";
    $('#divNumber').text(index);
    $('#blinkst').text(blink);
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}