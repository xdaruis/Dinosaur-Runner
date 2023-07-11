const MAX_GAME_SPEED = 40;
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
    // if (playerFeet === 1) {
    //     jump = true;
    // }
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
    // if (playerFeet === 1) {
    //     jump = true;
    // }
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

let gravitySpeed = 75;
let gravityInterval = null;

function fall() {
    if (playerFeet > 1) {
        movePlayer(-1);
    } else {
        jump = true;
        clearInterval(gravityInterval);
        gravityInterval = null;
    }
}

let gameSpeed = 150;
let gameInterval = setInterval(moveOneCactus, gameSpeed);

let actColumnId = columns;

let cactusOneId = "1" + " " + actColumnId;
document.getElementById(cactusOneId).className = "btn btn-dark";

let smallCactusId = "1" + " " + (columns - 1);

let cactusTwoId = "2" + " " + actColumnId;

let birdHeight = 1 + Math.floor(Math.random() * lines / 2);
let birdId = "" + birdHeight + " " + actColumnId;

let objects = 1;

function handleObjects() {
    const scoreUpdates = [5, 10, 15];
    if (scoreUpdates.includes(score)) {
        ++objects;
    }
    if (gameSpeed > MAX_GAME_SPEED) {
        gameSpeed -= 0.5;
    }
    ++score;
    document.getElementById("score").innerHTML = "Score: " + score;
    let randomObject = Math.floor(Math.random() * objects);
    // let randomObject = 3;
    for (let i = 0; i < dict[randomObject].length; ++i) {
        if (randomObject == 2) {
            dict[randomObject][i] = birdId;
        }
        document.getElementById(dict[randomObject][i]).className = "btn btn-dark";
    }
    gameInterval = setInterval(dict["" + randomObject + "move"], gameSpeed);
    // gameInterval = setInterval(moveObject(randomObject), gameSpeed);
}

const dict = {
    // "0default": ["1" + " " + columns],
    // "1default": ["1" + " " + columns, "2" + " " + actColumnId],
    // "2default": ["" + (1 + Math.floor(Math.random() * lines / 2)) + " " + actColumnId],
    // "3default": ["1" + " " + columns, "1" + " " + (columns - 1)],
    0: [cactusOneId],
    1: [cactusOneId, cactusTwoId],
    2: [birdId],
    3: [cactusOneId, smallCactusId],
    "0move": moveOneCactus,
    "1move": moveTwoHeightCactus,
    "2move": moveBird,
    "3move": moveTwoSmallCactus
};

// function moveObject(num) {
//     if (actColumnId == 1) {
//         for (let i = 0; i < dict[num].length; ++i) {
//             if (document.getElementById(dict[num]).className === "btn btn-dark") {
//                 document.getElementById(dict[num].className = "btn btn-warning");
//             }
//             if (num == 2) {
//                 birdHeight = 2 + Math.floor(Math.random() * 3);
//                 birdId = "" + birdHeight + " " + actColumnId;
//                 dict[num][i] = birdId;
//             }
//         }
//         actColumnId = columns;
//         // cactusOneId = "1" + " " + actColumnId;
//         for (let i = 0; i < dict[num].length; ++i) {
//             dict[num] = "" + dict[num] + "default";
//         }
//         clearInterval(gameInterval);
//         handleObjects();
//     } else {
//         // document.getElementById(cactusOneId).className = "btn btn-warning";
//         for (let i = 0; i < dict[num].length; ++i) {
//             document.getElementById(dict[num]).className = "btn btn-warning";
//         }
//         --actColumnId
//         cactusOneId = "1" + " " + actColumnId;
//         for (let i = 0; i < dict[num].length; ++i) {
//             // document.getElementById(dict[num]).className = "btn btn-warning";
//             dict[num] = 
//         }
//         if (document.getElementById(cactusOneId).className === "btn btn-success") {
//             document.getElementById(cactusOneId).className = "btn btn-dark";
//             gameOver();
//         }
//         document.getElementById(cactusOneId).className = "btn btn-dark";
//     }
// }

function moveOneCactus() {
    if (actColumnId > 1) {
        document.getElementById(cactusOneId).className = "btn btn-warning";
        --actColumnId
        cactusOneId = "1" + " " + actColumnId;
        if (document.getElementById(cactusOneId).className === "btn btn-success") {
            document.getElementById(cactusOneId).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(cactusOneId).className = "btn btn-dark";
    } else {
        if (document.getElementById(cactusOneId).className === "btn btn-dark") {
            document.getElementById(cactusOneId).className = "btn btn-warning";
        } else {
            gameOver();
            return;
        }
        actColumnId = columns;
        cactusOneId = "1" + " " + actColumnId;
        clearInterval(gameInterval);
        handleObjects();
    }
}

function moveTwoHeightCactus() {
    if (actColumnId > 1){
        document.getElementById(cactusOneId).className = "btn btn-warning";
        document.getElementById(cactusTwoId).className = "btn btn-warning";
        --actColumnId
        cactusOneId = "1" + " " + actColumnId;
        cactusTwoId = "2" + " " + actColumnId;
        if (document.getElementById(cactusOneId).className === "btn btn-success" ||
            document.getElementById(cactusTwoId).className === "btn btn-success") {
            document.getElementById(cactusOneId).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(cactusOneId).className = "btn btn-dark";
        document.getElementById(cactusTwoId).className = "btn btn-dark";
    } else {
        if (document.getElementById(cactusOneId).className === "btn btn-dark") {
            document.getElementById(cactusOneId).className = "btn btn-warning";
            document.getElementById(cactusTwoId).className = "btn btn-warning";
        } else {
            gameOver();
            return;
        }
        actColumnId = columns;
        cactusOneId = "1" + " " + actColumnId;
        cactusTwoId = "2" + " " + actColumnId;
        clearInterval(gameInterval);
        handleObjects();
    }
}

function moveBird() {
    if (actColumnId > 1) {
        document.getElementById(birdId).className = "btn btn-warning";
        --actColumnId
        birdId = "" + birdHeight + " " + actColumnId;
        if (document.getElementById(birdId).className === "btn btn-success") {
            document.getElementById(birdId).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(birdId).className = "btn btn-dark";
    } else {
        if (document.getElementById(birdId).className === "btn btn-dark") {
            document.getElementById(birdId).className = "btn btn-warning";
        } else {
            gameOver();
            return;
        }
        actColumnId = columns;
        birdHeight = 2 + Math.floor(Math.random() * 3);
        birdId = "" + birdHeight + " " + actColumnId;
        clearInterval(gameInterval);
        handleObjects();
    }
}

function moveTwoSmallCactus() {
    if (actColumnId > 1) {
        document.getElementById(cactusOneId).className = "btn btn-warning";
        document.getElementById(smallCactusId).className = "btn btn-warning";
        --actColumnId
        cactusOneId = "1" + " " + actColumnId;
        smallCactusId = "1" + " " + (actColumnId - 1);
        if (document.getElementById(cactusOneId).className === "btn btn-success" ||
            document.getElementById(smallCactusId).className === "btn btn-success") {
            document.getElementById(cactusOneId).className = "btn btn-dark";
            document.getElementById(smallCactusId).className = "btn btn-dark";
            gameOver();
        }
        document.getElementById(cactusOneId).className = "btn btn-dark";
        document.getElementById(smallCactusId).className = "btn btn-dark";
    } else {
        if (document.getElementById(cactusOneId).className === "btn btn-dark" ||
            document.getElementById(smallCactusId).className === "btn btn-dark") {
            document.getElementById(cactusOneId).className = "btn btn-warning";
            document.getElementById(smallCactusId).className = "btn btn-warning";
        } else {
            gameOver();
            return;
        }
        actColumnId = columns;
        cactusOneId = "1" + " " + actColumnId;
        smallCactusId = "1" + " " + (actColumnId - 1);
        clearInterval(gameInterval);
        handleObjects();
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