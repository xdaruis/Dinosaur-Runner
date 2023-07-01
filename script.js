const lines = 10, columns = 13;
let score = 0;

let playerFeet = 1;
let playerHead = 2;
let jump = true;

document.onload = generateBoard();

function generateBoard() {
    for (let i = lines; i > 0; --i) {
        const box = document.createElement("div");
        box.className = "d-flex justify-content-center";
        document.body.appendChild(box);
        for (let j = 1; j <= columns; ++j) {
            const btn = document.createElement('button');
            btn.id = "" + i + " " + j;
            btn.innerHTML = "";
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


document.addEventListener('keydown', (e) => {
    e = e || window.event;
    if ((e.code === 'KeyW' || e.code === 'ArrowUp') && playerFeet < lines - 2 && jump === true) {
        if (document.getElementById("1 2").className === "btn btn-success") {
            document.getElementById("1 2").className = "btn btn-warning";
        }
        colorPosition(playerFeet, playerHead, "btn btn-warning");
        ++playerFeet;
        ++playerHead;
        // checkPlayerHitObject();
        colorPosition(playerFeet, playerHead, "btn btn-success");
        if (playerFeet === lines - 2) {
            jump = false;
        }
    } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        if (playerFeet > 1) {
            colorPosition(playerFeet, playerHead, "btn btn-warning");
            --playerFeet;
            --playerHead;
            // checkPlayerHitObject();
            colorPosition(playerFeet, playerHead, "btn btn-success");
        } else {
            document.getElementById("2 1").className = "btn btn-warning";
            document.getElementById("1 2").className = "btn btn-success";
            document.getElementById("1 1").className = "btn btn-success";
            // checkPlayerDucked();
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
    if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        if (gravityInterval == null) {
            gravityInterval = setInterval(fall, gravitySpeed);
        }
        jump = false;
    } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        document.getElementById("1 2").className = "btn btn-warning";
        document.getElementById("2 1").className = "btn btn-success";
        checkPlayerHitObject();
    }
});

// function checkPlayerHitObject() {
//     if (document.getElementById(playerFeet).className === "btn btn-dark" ||
//     document.getElementById(playerHead).className === "btn btn-dark") {
//             gameOver();
//         }
// }

// function checkPlayerDucked() {
//     if (document.getElementById("1 2").className === "btn btn-dark" ||
//         document.getElementById("1 1").className === "btn btn-dark") {
//         gameOver();
//     }
// }

function colorPosition(feet, head, color) {
    document.getElementById("" + feet + " " + "1").className = color;
    document.getElementById("" + head + " " + "1").className = color;
}

let gravitySpeed = 75;
let gravityInterval = null;

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

let gameSpeed = 150;
let gameInterval = setInterval(oneCactus, gameSpeed);

let actColumn = columns;
let cactusOne = "1" + " " + actColumn;
document.getElementById(cactusOne).className = "btn btn-dark";

let smallCactusId = "1" + " " + (columns - 1);

let cactusTwo = "2" + " " + actColumn;

let birdHeight = 1 + Math.floor(Math.random() * lines / 2);
let birdId = "" + birdHeight + " " + actColumn;

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
    document.getElementById("score").innerHTML = "Score: " + score;
    let randomObject = Math.floor(Math.random() * objects);
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
    if (actColumn == 1) {
        if (document.getElementById(cactusOne).className === "btn btn-dark") {
            document.getElementById(cactusOne).className = "btn btn-warning";
        }
        actColumn = columns;
        cactusOne = "1" + " " + actColumn;
        clearInterval(gameInterval);
        handleObjects();
    } else {
        document.getElementById(cactusOne).className = "btn btn-warning";
        --actColumn
        cactusOne = "1" + " " + actColumn;
        if (document.getElementById(cactusOne).className === "btn btn-success") {
            document.getElementById(cactusOne).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(cactusOne).className = "btn btn-dark";
    }
}


function twoHeightCactus() {
    if (actColumn == 1) {
        if (document.getElementById(cactusOne).className === "btn btn-dark") {
            document.getElementById(cactusOne).className = "btn btn-warning";
            document.getElementById(cactusTwo).className = "btn btn-warning";
        }
        actColumn = columns;
        cactusOne = "1" + " " + actColumn;
        cactusTwo = "2" + " " + actColumn;
        clearInterval(gameInterval);
        handleObjects();
    } else {
        document.getElementById(cactusOne).className = "btn btn-warning";
        document.getElementById(cactusTwo).className = "btn btn-warning";
        --actColumn
        cactusOne = "1" + " " + actColumn;
        cactusTwo = "2" + " " + actColumn;
        if (document.getElementById(cactusOne).className === "btn btn-success" ||
            document.getElementById(cactusTwo).className === "btn btn-success") {
            document.getElementById(cactusOne).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(cactusOne).className = "btn btn-dark";
        document.getElementById(cactusTwo).className = "btn btn-dark";
    }
}


function bird() {
    if (actColumn == 1) {
        if (document.getElementById(birdId).className === "btn btn-dark") {
            document.getElementById(birdId).className = "btn btn-warning";
        }
        actColumn = columns;
        birdHeight = 2 + Math.floor(Math.random() * 3);
        birdId = "" + birdHeight + " " + actColumn;
        clearInterval(gameInterval);
        handleObjects();
    } else {
        document.getElementById(birdId).className = "btn btn-warning";
        --actColumn
        birdId = "" + birdHeight + " " + actColumn;
        if (document.getElementById(birdId).className === "btn btn-success") {
            document.getElementById(birdId).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(birdId).className = "btn btn-dark";
    }
}

function twoSmallCactus() {
    if (actColumn == 1) {
        if (document.getElementById(cactusOne).className === "btn btn-dark" ||
            document.getElementById(smallCactusId).className === "btn btn-dark") {
            document.getElementById(cactusOne).className = "btn btn-warning";
            document.getElementById(smallCactusId).className = "btn btn-warning";
        }
        actColumn = columns;
        cactusOne = "1" + " " + actColumn;
        smallCactusId = "1" + " " + (actColumn - 1);
        clearInterval(gameInterval);
        handleObjects();
    } else {
        document.getElementById(cactusOne).className = "btn btn-warning";
        document.getElementById(smallCactusId).className = "btn btn-warning";
        --actColumn
        cactusOne = "1" + " " + actColumn;
        smallCactusId = "1" + " " + (actColumn - 1);
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
