const playerID = ["5", "4"];
document.getElementById(playerID[0] + 0).className = "btn btn-success";
document.getElementById(playerID[1] + 0).className = "btn btn-success";

let gravitation = setInterval(gravity, 300);
// let one = setInterval(jump, 2000);
// let two = setInterval(jump, 3000);
// let three = setInterval(jump, 4000);

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW' && playerID[0] == 5) {
        jump();
        jump();
        // let one = setInterval(jump, 10);
        // let two = setInterval(jump, 20);
        // clearInterval(one);
        // clearInterval(two);
        // clearInterval(three);
    } else if (e.code === 'KeyS') {
        if (playerID[0] < 5 && playerID[1] < 4) {
            ++playerID[0];
            ++playerID[1];
        }
    }
});

function gravity() {
    if (playerID[0] < 5 && playerID[1] < 4) {
        ++playerID[0];
        ++playerID[1];
    }
}

function gravity() {
    document.getElementById(playerID[0] + '0').className ="btn btn-warning";
    document.getElementById(playerID[1] + '0').className = "btn btn-warning";
    if (playerID[0] < 5 && playerID[1] < 4) {
        ++playerID[0];
        ++playerID[1];
    }
    document.getElementById(playerID[0] + '0').className ="btn btn-success";
    document.getElementById(playerID[1] + '0').className = "btn btn-success";
}

function jump() {
    document.getElementById(playerID[0] + '0').className ="btn btn-warning";
    document.getElementById(playerID[1] + '0').className = "btn btn-warning";
    --playerID[0];
    --playerID[1];
    document.getElementById(playerID[0] + '0').className ="btn btn-success";
    document.getElementById(playerID[1] + '0').className = "btn btn-success";
}

function goDown() {
    document.getElementById(playerID[0] + '0').className ="btn btn-warning";
    document.getElementById(playerID[1] + '0').className = "btn btn-warning";
    if (playerID[0] < 5 && playerID[1] < 4) {
        ++playerID[0];
        ++playerID[1];
    }
    document.getElementById(playerID[0] + '0').className ="btn btn-success";
    document.getElementById(playerID[1] + '0').className = "btn btn-success";
}