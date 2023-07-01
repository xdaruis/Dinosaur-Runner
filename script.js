let playerFeet = 1;
let playerHead = 2;
const lines = 7, columns = 9;

document.onload = generateBoard();

function generateBoard() {
    for (let i = lines; i > 0; --i) {
        const box = document.createElement("div");
        box.className = "d-flex justify-content-center";
        document.body.appendChild(box);
        for (let j = 1; j <= columns; ++j) {
            const btn = document.createElement('button');
            btn.id = "" + i + " " + j;
            btn.innerHTML = btn.id;
            btn.className = "btn btn-warning";
            btn.disabled = true;
            box.appendChild(btn);
        }
    }
    document.getElementById("" + playerFeet + " " + "1").className = "btn btn-success";
    document.getElementById("" + playerHead + " " + "1").className = "btn btn-success";
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

function handleObjects() {
    let randomObject = Math.floor(Math.random() * 1);
    if (randomObject == 0) {
        document.getElementById(cactusOne).className = "btn btn-dark";
        gameInterval = setInterval(oneCactus, gameSpeed);
    }
}

let build = true;

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

function gameOver() {
    const box = document.createElement("div");
    box.className = "d-flex justify-content-center";
    document.body.appendChild(box);
    const div = document.createElement("h1");
    div.innerHTML = "GAME OVER!";
    box.appendChild(div);
    clearInterval(gameInterval);
    document.removeEventListener('keydown', e);
    document.removeEventListener('keyup', e);
}