const startGameSection = document.querySelector(".start-game");
const gameSection = document.querySelector(".game");
const gameBoardDiv = document.querySelectorAll(".game__board--div");
const chooseXdiv= document.querySelector(".start-game__choose-player--x");
const chooseOdiv = document.querySelector(".start-game__choose-player--o");
const choosePlayer = document.querySelector(".start-game__choose-player--div");
const choosenX = document.getElementById("choose-x");
const choosenO = document.getElementById("choose-o");
const playerTurn = document.getElementById("whosTurn");
const vsCpu = document.querySelector(".start-game__buttons--cpu");
const vsPlayer = document.querySelector(".start-game__buttons--player");
let isPlayer_O_Turn = false;
let gameEnd = false;
let gameState = ["", "", "", "", "", "", "", "", ""];
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]


let p1 = "2";
let p2 = "1";
let isButton = null;
choosePlayer.addEventListener('click', (e) => {
    isButton = e.target.nodeName === 'DIV'; 
    if (!isButton) return;

    if(e.target.classList.contains("start-game__choose-player--x")) {
        chooseXdiv.classList.add("active");
        chooseOdiv .classList.remove("active");
        choosenX.src = "./assets/navy-x.svg";
        choosenO.src = "./assets/silver-o.svg";
        p1 = "1";
        p2 = "2";
        return p1, p2;
    } else {
        chooseXdiv.classList.remove("active");
        chooseOdiv .classList.add("active");
        choosenX.src = "./assets/silver-x.svg";
        choosenO.src = "./assets/navy-o.svg";
    }   
})

choosePlayer.addEventListener("mouseover", (e) => {
    e.target.style.cursor = "pointer";
})

function setScoreMenuToMultiplayer() {
    document.getElementById("x-player-score-label").innerText = "X" + "(P" + p1 + ")";
    document.getElementById("o-player-score-label").innerText = "O" + "(P" + p2 + ")";
    return p1, p2;
}

function setScoreMenuToCPU() {
    document.getElementById("x-player-score-label").innerText = "X (You)";
    document.getElementById("o-player-score-label").innerText = "O (CPU)";
}

vsCpu.onclick = () => {
    startGameSection.style.zIndex = "0";
    setScoreMenuToCPU();
}

vsPlayer.onclick = () => {
    startGameSection.style.zIndex = "0";
    setScoreMenuToMultiplayer();
}

function x_element(event) {
    let newElement = document.createElement('IMG');
    event.target.appendChild(newElement);
    newElement.src = "./assets/icon-x.svg";
    isPlayer_O_Turn = true;
}

function o_element(event) {
    let newElement = document.createElement('IMG');
    event.target.appendChild(newElement);
    newElement.src = "./assets/icon-o.svg";
    isPlayer_O_Turn = false;
}

function insertElement(event) {
    const clickedCellIndex = parseInt(event.target.getAttribute('index'));

    if(isPlayer_O_Turn) {
        o_element(event);
        playerTurn.src = "./assets/silver-x.svg";
        gameState.splice(clickedCellIndex, 1, "o");
    } else {
        x_element(event);
        playerTurn.src = "./assets/silver-o.svg";
        gameState.splice(clickedCellIndex, 1, "x");
    }
}

gameBoardDiv.forEach(box => {
    box.onclick = (event) => {
        if(!gameEnd) {
            insertElement(event);  
            checkWin(); 
        } 
    }
})

function checkWin() {
    for(let i = 0; i < 8; i++ ) {
        const winCondition = WINNING_COMBINATIONS[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]]; 
        if (a === '' || b === '' || c === '') { continue; }
        if(a===b && b===c) {
            winnerReveal(a);
            return gameEnd = true;
        }
        if (!gameState.includes("")) {
            gameTied();
            return gameEnd = true;
        }
    }
}

function gameTied() {
    document.querySelector(".tied").style.zIndex = "100";
    tieScore = countScore(tieScore, "tie-score");
    quit(2, ".tied");
    nextRound(2, ".tied"); 
}

function countScore(playerScore, playerId) {
    playerScore++;
    document.getElementById(playerId).innerText = playerScore;
    return playerScore;
}

let xScore = 0;
let oScore = 0;
let tieScore = 0;
function winnerReveal(a) {
    if(a === "x") {
        document.querySelector(".won").style.zIndex = "100";
        document.getElementById("winMessage").innerText = "PLAYER " + p1 + " IS WINNER!";
        xScore = countScore(xScore, "x-score");
        console.log("x = " + xScore);
        quit(1, ".won");
        nextRound(1, ".won"); 
    } else {
        document.querySelector(".lost").style.zIndex = "100";
        document.getElementById("lostMessage").innerText = "PLAYER " + p2 + " IS WINNER!";
        oScore = countScore(oScore, "o-score");
        quit(0, ".lost");
        nextRound(0, ".lost"); 
    }
    
}

function quit(index, status) {
    document.getElementsByClassName("quit-btn")[index].onclick = () => {
        startGameSection.style.zIndex = "100";
        document.querySelector(status).style.zIndex = "0";
        reset();
        resetScore() 
    }
}

function nextRound(index, status) {
    document.getElementsByClassName("next-btn")[index].onclick = () => {
        document.querySelector(status).style.zIndex = "0";
        reset();
    }
}

function reset() {
    isPlayer_O_Turn = false;
    gameEnd = false;
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameBoardDiv.forEach(box => {
        box.innerHTML = "";
    })
}

function resetScore() {
    xScore = 0;
    oScore = 0;
    tieScore = 0;
    document.getElementById("x-score").innerText = xScore
    document.getElementById("o-score").innerText = oScore;
    document.getElementById("tie-score").innerText = tieScore;
}