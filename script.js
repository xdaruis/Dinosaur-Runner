let playerFeet = 1;
let playerHead = 2;
const lines = 10, columns = 13;
let score = 0;

document.onload = generateBoard();

function generateBoard() {
    for (let i = lines; i > 0; --i) {
        const box = document.createElement("div");
        box.className = "d-flex justify-content-center";
        document.body.appendChild(box);
        for (let j = 1; j <= columns; ++j) {
            const btn = document.createElement('button');
            btn.id = "" + i + " " + j;
            btn.innerHTML = "X";
            btn.className = "btn btn-warning";
            btn.disabled = true;
            box.appendChild(btn);
        }
    }
    document.getElementById("" + playerFeet + " " + "1").className = "btn btn-success";
    document.getElementById("" + playerHead + " " + "1").className = "btn btn-success";
    const box = document.createElement("div");
    box.className = "d-flex justify-content-center";
    document.body.appendChild(box);
    const text = document.createElement("h1");
    text.id = "score";
    text.innerHTML = "Score : 0";
    box.appendChild(text);
}

let jump = true;

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW' && playerFeet < lines - 2 && jump === true) {
        if (document.getElementById("1 2").className === "btn btn-success") {
            document.getElementById("1 2").className = "btn btn-warning";
        }
        colorPosition(playerFeet, playerHead, "btn btn-warning");
        colorPosition(++playerFeet, ++playerHead, "btn btn-success");
        if (playerFeet === lines - 2) {
            jump = false;
        }
    } else if (e.code === 'KeyS') {
        if (playerFeet > 1) {
            colorPosition(playerFeet, playerHead, "btn btn-warning");
            colorPosition(--playerFeet, --playerHead, "btn btn-success");
        } else {
            document.getElementById("2 1").className = "btn btn-warning";
            document.getElementById("1 2").className = "btn btn-success";
        }
    }
    if (playerFeet === 1) {
        jump = true;
    } else if (playerFeet === lines - 2 && gravityInterval === null) {
        gravityInterval = setInterval(fall, gravitySpeed);
    }
});

document.addEventListener('keyup', (e) => {
    e = e || window.event;
    if (e.keyCode == 87) {
        if (gravityInterval == null) {
            gravityInterval = setInterval(fall, gravitySpeed);
        }
        jump = false;
    } else if (e.keyCode == 83) {
        document.getElementById("1 2").className = "btn btn-warning";
        document.getElementById("2 1").className = "btn btn-success";
    }
});

function colorPosition(feet, head, color) {
    document.getElementById("" + feet + " " + "1").className = color;
    document.getElementById("" + head + " " + "1").className = color;
}

function fall() {
    colorPosition(playerFeet, playerHead, "btn btn-warning");
    if (playerFeet > 1) {
        --playerFeet;
        --playerHead
    }
    colorPosition(playerFeet, playerHead, "btn btn-success");
    if (playerFeet == 1) {
        jump = true;
        clearInterval(gravityInterval);
        gravityInterval = null;
    }
}

let gravityStarted = false;
let gravitySpeed = 75;
let gravityInterval = null;

// Voi face 4 functii separate pnetru 
// o pasare , un cactus 1 patratica, 1 cactus 2 inaltime si 1 cactus 2 latime
// si voi merge cu una random pana la finalul tablei

let gameSpeed = 150;
let gameInterval = setInterval(oneCactus, gameSpeed);

let cactusX = columns;
let cactusOne = "1" + " " + cactusX;
document.getElementById(cactusOne).className = "btn btn-dark";

let smallCactusId = "1" + " " + (columns - 1);

let objects = 1;

function handleObjects() {
    if (score === 5) {
        ++objects;
    } else if (score === 10) {
        ++objects;
    } else if (score === 15) {
        ++objects;
    }
    ++score;
    gameSpeed -= 0.5;
    // console.log(gameSpeed);
    document.getElementById("score").innerHTML = "Score: " + score;
    let randomObject = Math.floor(Math.random() * objects);
    // let randomObject = 3;
    if (randomObject == 0) {
        document.getElementById(cactusOne).className = "btn btn-dark";
        gameInterval = setInterval(oneCactus, gameSpeed);
    } else if (randomObject == 1) {
        document.getElementById(cactusOne).className = "btn btn-dark";
        document.getElementById(cactusTwo).className = "btn btn-dark";
        gameInterval = setInterval(twoHeightCactus, gameSpeed);
    } else if (randomObject == 2) {
        document.getElementById(birdId).className = "btn btn-dark";
        gameInterval = setInterval(bird, gameSpeed);
    } else {
        document.getElementById(cactusOne).className = "btn btn-dark";
        console.log(smallCactusId);
        document.getElementById(smallCactusId).className = "btn btn-dark";
        gameInterval = setInterval(twoSmallCactus, gameSpeed);
    }
}

function oneCactus() {
    if (cactusX == 1) {
        if (document.getElementById(cactusOne).className === "btn btn-dark") {
            document.getElementById(cactusOne).className = "btn btn-warning";
        }
        cactusX = columns;
        cactusOne = "1" + " " + cactusX;
        clearInterval(gameInterval);
        handleObjects();
    } else {
        document.getElementById(cactusOne).className = "btn btn-warning";
        --cactusX
        cactusOne = "1" + " " + cactusX;
        if (document.getElementById(cactusOne).className === "btn btn-success") {
            document.getElementById(cactusOne).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(cactusOne).className = "btn btn-dark";
    }
}

let cactusTwo = "2" + " " + cactusX;

function twoHeightCactus() {
    if (cactusX == 1) {
        if (document.getElementById(cactusOne).className === "btn btn-dark") {
            document.getElementById(cactusOne).className = "btn btn-warning";
            document.getElementById(cactusTwo).className = "btn btn-warning";
        }
        cactusX = columns;
        cactusOne = "1" + " " + cactusX;
        cactusTwo = "2" + " " + cactusX;
        clearInterval(gameInterval);
        handleObjects();
    } else {
        document.getElementById(cactusOne).className = "btn btn-warning";
        document.getElementById(cactusTwo).className = "btn btn-warning";
        --cactusX
        cactusOne = "1" + " " + cactusX;
        cactusTwo = "2" + " " + cactusX;
        if (document.getElementById(cactusOne).className === "btn btn-success" ||
            document.getElementById(cactusTwo).className === "btn btn-success") {
            document.getElementById(cactusOne).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(cactusOne).className = "btn btn-dark";
        document.getElementById(cactusTwo).className = "btn btn-dark";
    }
}

let birdHeight = 1 + Math.floor(Math.random() * lines / 2);
let birdId = "" + birdHeight + " " + cactusX;

function bird() {
    if (cactusX == 1) {
        if (document.getElementById(birdId).className === "btn btn-dark") {
            document.getElementById(birdId).className = "btn btn-warning";
        }
        cactusX = columns;
        birdHeight = 2 + Math.floor(Math.random() * 3);
        birdId = "" + birdHeight + " " + cactusX;
        clearInterval(gameInterval);
        handleObjects();
    } else {
        document.getElementById(birdId).className = "btn btn-warning";
        --cactusX
        birdId = "" + birdHeight + " " + cactusX;
        if (document.getElementById(birdId).className === "btn btn-success") {
            document.getElementById(birdId).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(birdId).className = "btn btn-dark";
    }
}


function twoSmallCactus() {
    if (cactusX == 1) {
        if (document.getElementById(cactusOne).className === "btn btn-dark" ||
            document.getElementById(smallCactusId).className === "btn btn-dark") {
            document.getElementById(cactusOne).className = "btn btn-warning";
            document.getElementById(smallCactusId).className = "btn btn-warning";
        }
        cactusX = columns;
        cactusOne = "1" + " " + cactusX;
        smallCactusId = "1" + " " + (cactusX - 1);
        clearInterval(gameInterval);
        handleObjects();
    } else {
        document.getElementById(cactusOne).className = "btn btn-warning";
        document.getElementById(smallCactusId).className = "btn btn-warning";
        --cactusX
        cactusOne = "1" + " " + cactusX;
        smallCactusId = "1" + " " + (cactusX - 1);
        if (document.getElementById(cactusOne).className === "btn btn-success" ||
            document.getElementById(smallCactusId).className === "btn btn-success") {
            document.getElementById(cactusOne).className = "btn btn-dark";
            document.getElementById(smallCactusId).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(cactusOne).className = "btn btn-dark";
        document.getElementById(smallCactusId).className = "btn btn-dark";
    }
}

function gameOver() {
    const box = document.createElement("div");
    box.className = "d-flex justify-content-center";
    document.body.appendChild(box);
    const div = document.createElement("h1");
    div.innerHTML = "GAME OVER!";
    box.appendChild(div);
    clearInterval(gameInterval);
    window.addEventListener('keydown', function(event) {
        event.stopImmediatePropagation();
    }, true);
    window.addEventListener('keyup', function(event) {
        event.stopImmediatePropagation();
    }, true);
}
