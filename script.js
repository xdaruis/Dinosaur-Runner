// const playerID = ["5", "4"];
// document.getElementById(playerID[0] + 0).className = "btn btn-success";
// document.getElementById(playerID[1] + 0).className = "btn btn-success";

// let gravitation = setInterval(gravity, 300);
// // let one = setInterval(jump, 2000);
// // let two = setInterval(jump, 3000);
// // let three = setInterval(jump, 4000);

// document.addEventListener('keydown', (e) => {
//     if (e.code === 'KeyW' && playerID[0] == 5) {
//         jump();
//         jump();
//         // let one = setInterval(jump, 10);
//         // let two = setInterval(jump, 20);
//         // clearInterval(one);
//         // clearInterval(two);
//         // clearInterval(three);
//     } else if (e.code === 'KeyS') {
//         if (playerID[0] < 5 && playerID[1] < 4) {
//             ++playerID[0];
//             ++playerID[1];
//         }
//     }
// });

// function gravity() {
//     if (playerID[0] < 5 && playerID[1] < 4) {
//         ++playerID[0];
//         ++playerID[1];
//     }
// }

// function gravity() {
//     document.getElementById(playerID[0] + '0').className ="btn btn-warning";
//     document.getElementById(playerID[1] + '0').className = "btn btn-warning";
//     if (playerID[0] < 5 && playerID[1] < 4) {
//         ++playerID[0];
//         ++playerID[1];
//     }
//     document.getElementById(playerID[0] + '0').className ="btn btn-success";
//     document.getElementById(playerID[1] + '0').className = "btn btn-success";
// }

// function jump() {
//     document.getElementById(playerID[0] + '0').className ="btn btn-warning";
//     document.getElementById(playerID[1] + '0').className = "btn btn-warning";
//     --playerID[0];
//     --playerID[1];
//     document.getElementById(playerID[0] + '0').className ="btn btn-success";
//     document.getElementById(playerID[1] + '0').className = "btn btn-success";
// }

// function goDown() {
//     document.getElementById(playerID[0] + '0').className ="btn btn-warning";
//     document.getElementById(playerID[1] + '0').className = "btn btn-warning";
//     if (playerID[0] < 5 && playerID[1] < 4) {
    //         ++playerID[0];
    //         ++playerID[1];
//     }
//     document.getElementById(playerID[0] + '0').className ="btn btn-success";
//     document.getElementById(playerID[1] + '0').className = "btn btn-success";
// }

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
        colorPosition(playerFeet, playerHead, "btn btn-warning");
        colorPosition(++playerFeet, ++playerHead, "btn btn-success");
        if (playerFeet === lines - 2) {
            jump = false;
        }
    } else if (e.code === 'KeyS') {
        if (playerFeet > 1) {
            colorPosition(playerFeet, playerHead, "btn btn-warning");
            colorPosition(--playerFeet, --playerHead, "btn btn-success");
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
        jump = false;
        if (gravityInterval == null) {
            gravityInterval = setInterval(fall, gravitySpeed);
        }
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