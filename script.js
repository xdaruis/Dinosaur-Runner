const SCORE_UPDATES = [5, 10, 15];
const MAX_OBJECTS = 6;
const MAX_OBJECT_SPEED = 40;
const lines = 10, columns = 17;

let score = 0;

let playerFeet = 1;
let playerHead = 2;
let jump = true;

let gravitySpeed = 75;
let gravityInterval = null;

let uniqueObjects = 1;

const oneCactus = [];
const twoHeightCactus = [];
const twoSmallCactus = [];
const birdOne = [];
const birdTwo = [];
const birdThree = [];

generateBoard();

buildObjects();

document.getElementById(oneCactus[oneCactus.length - 1]).className = "btn btn-dark";
let objectSpeed = 150;
let gameInterval = setInterval(moveObjects, objectSpeed, oneCactus, columns);

function generateBoard() {
    for (let i = lines; i > 0; --i) {
        const box = document.createElement("div");
        box.className = "d-flex justify-content-center";
        document.body.appendChild(box);
        for (let j = 1; j <= columns; ++j) {
            const btn = document.createElement('button');
            btn.id = "" + i + " " + j;
            btn.innerHTML = "&nbsp;";
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

function buildObjects() {
    for (let i = 0; i < columns; ++i) {
        oneCactus[i] = [];
        twoHeightCactus[i] = [];
        twoSmallCactus[i] = [];
        birdOne[i] = [];
        birdTwo[i] = [];
        birdThree[i] = [];
        for (let j = 0; j < 1; ++j) {
            oneCactus[i][j] = "1 " + (i + 1);
            birdOne[i][j] = "2 " + (i + 1);
            birdTwo[i][j] = "3 " + (i + 1);
            birdThree[i][j] = "4 " + (i + 1);
        }
        for (let j = 0; j < 2; ++j) {
            twoSmallCactus[i][j] = "1 " + (i + 1 - j);
            twoHeightCactus[i][j] = "" + (1 + j) + " " + (i + 1);
        }
    }
}

document.addEventListener('keydown', (e) => {
    e = e || window.event;
    if ((e.code === 'KeyW' || e.code === 'ArrowUp') && playerFeet < lines - 2 && jump === true) {
        movePlayer(1);
        if (playerFeet === lines - 2) {
            jump = false;
            if (gravityInterval === null) {
                gravityInterval = setInterval(fall, gravitySpeed);
            }
        }
        if (document.getElementById("1 2").className === "btn btn-success") {
            document.getElementById("1 2").className = "btn btn-warning";
        }
    } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        if (playerFeet > 1) {
            movePlayer(-1);
        } else {
            if (document.getElementById("2 1").className === "btn btn-success") {
                document.getElementById("2 1").className = "btn btn-warning";
            }
            document.getElementById("1 2").className = "btn btn-success";
            document.getElementById("1 1").className = "btn btn-success";
        }
    }
});

document.addEventListener('keyup', (e) => {
    e = e || window.event;
    if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        if (gravityInterval == null) {
            gravityInterval = setInterval(fall, gravitySpeed);
        }
        jump = false;
    } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        document.getElementById("1 2").className = "btn btn-warning";
        document.getElementById("2 1").className = "btn btn-success";
    }
});

function movePlayer(value) {
    colorPosition("btn btn-warning");
    playerFeet += value;
    playerHead += value;
    colorPosition("btn btn-success");
}

function colorPosition(color) {
    document.getElementById("" + playerFeet + " " + "1").className = color;
    document.getElementById("" + playerHead + " " + "1").className = color;
}

function fall() {
    if (playerFeet > 1) {
        movePlayer(-1);
    } else {
        jump = true;
        clearInterval(gravityInterval);
        gravityInterval = null;
    }
}

function moveObjects(mt, actPosition) {
    for (let i = 0; i < mt[0].length; ++i) {
        document.getElementById(mt[actPosition - 1][i]).className = "btn btn-warning";
    }
    --actPosition;
    for (let i = 0; i < mt[0].length; ++i) {
        if (document.getElementById(mt[actPosition - 1][i]).className === "btn btn-success") {
            gameOver();
            return;
        }
        document.getElementById(mt[actPosition - 1][i]).className = "btn btn-dark";
    }
    clearInterval(gameInterval);
    if (actPosition == 1) {
        setTimeout(function() {
            for (let i = 0; i < mt[0].length; ++i) {
                if (document.getElementById(mt[0][i]).className === "btn btn-success") {
                    gameOver();
                    return;
                }
                document.getElementById(mt[0][i]).className = "btn btn-warning";
            }
            handleGame(mt);
        }, objectSpeed); 
        return;
    }
    gameInterval = setInterval(moveObjects, objectSpeed, mt, actPosition);
}

const objects = {
    0: oneCactus,
    1: twoHeightCactus,
    2: twoSmallCactus,
    3: birdOne,
    4: birdTwo,
    5: birdThree
};

function handleGame(mt) {
    if (score === SCORE_UPDATES[0] || score === SCORE_UPDATES[1]) {
        ++uniqueObjects;
    } else if (score === SCORE_UPDATES[2]) {
        uniqueObjects = MAX_OBJECTS;
    }
    if (objectSpeed > MAX_OBJECT_SPEED) {
        objectSpeed -= 0.5;
    }
    ++score;
    document.getElementById("score").innerHTML = "Score: " + score;
    let actObject = Math.floor(Math.random() * uniqueObjects);
    for (let i = 0; i < objects[actObject][0].length; ++i) {
        document.getElementById(objects[actObject][columns - 1][i]).className = "btn btn-dark";
    }
    gameInterval = setInterval(moveObjects, objectSpeed, objects[actObject], columns);
}

function gameOver() {
    clearInterval(gameInterval);
    clearInterval(fall);
    const box = document.createElement("div");
    box.className = "d-flex justify-content-center";
    document.body.appendChild(box);
    const div = document.createElement("h1");
    div.innerHTML = "GAME OVER!";
    box.appendChild(div);
    window.addEventListener('keydown', function(event) {
        event.stopImmediatePropagation();
    }, true);
    window.addEventListener('keyup', function(event) {
        event.stopImmediatePropagation();
    }, true);
}