const startGameSection = document.querySelector(".start-game");
const gameSection = document.querySelector(".game");
const gameBoardDiv = document.querySelectorAll(".game__board--div");
const chooseXdiv= document.querySelector(".start-game__choose-player--x");
const chooseOdiv = document.querySelector(".start-game__choose-player--o");
const choosePlayer = document.querySelector(".start-game__choose-player--div");
const playerTurn = document.getElementById("whosTurn");
const vsCpu = document.querySelector(".start-game__buttons--cpu");
const vsPlayer = document.querySelector(".start-game__buttons--player");

let multiplayer = false;
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
let arrayRand = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let p1 = "2";
let p2 = "1";
let isButton = null;
choosePlayer.addEventListener('click', (e) => {
    isButton = e.target.nodeName === 'DIV'; 
    if (!isButton) return;

    if(e.target.classList.contains("start-game__choose-player--x")) {
        chooseXdiv.classList.add("active-x");
        chooseOdiv.classList.remove("active-o");
        p1 = "1";
        p2 = "2";
        return p1, p2;
    } else {
        chooseXdiv.classList.remove("active-x");
        chooseOdiv.classList.add("active-o");
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
    if(document.querySelector(".start-game__choose-player--x").classList.contains("active-x")){
        document.getElementById("x-player-score-label").innerText = "X (You)";
        document.getElementById("o-player-score-label").innerText = "O (CPU)";
    } else {
        document.getElementById("x-player-score-label").innerText = "X (CPU)";
        document.getElementById("o-player-score-label").innerText = "O(You)";
    }
}

vsCpu.onclick = () => {
    startGameSection.style.zIndex = "0";
    setScoreMenuToCPU();
    insertCpulement()
}

vsPlayer.onclick = () => {
    multiplayer = true;
    startGameSection.style.zIndex = "0";
    setScoreMenuToMultiplayer();
    playGame();
}

//from
function insertCpulement(event) {
    if(document.querySelector(".start-game__choose-player--x").classList.contains("active-x")) {
        gameBoardDiv.forEach(box => {
            box.classList.add("x-hover");
            box.onclick = (event) => {
                if(!gameEnd) {
                    const clickedCellIndex = parseInt(event.target.getAttribute('index'));
                    arrayRand.splice(arrayRand.indexOf(clickedCellIndex), 1);

                    if (gameState[clickedCellIndex] !== "") { return; }

                    add_x_element(event);
                    playerTurn.src = "./assets/silver-o.svg";
                    gameState.splice(clickedCellIndex, 1, "x");
                    
                    console.log(clickedCellIndex + "clickedindex");
                    if(isPlayer_O_Turn == true) {
                        playCpu("o");
                    } 
                    isPlayer_O_Turn = true
                } 
                checkWin(); 
            }   
        })
    }   
    if(document.querySelector(".start-game__choose-player--o").classList.contains("active-o")) {
        playCpu("x");
        gameBoardDiv.forEach(box => {
            box.classList.add("o-hover");
            box.onclick = (event) => {
                if(!gameEnd) {
                    const clickedCellIndex = parseInt(event.target.getAttribute('index'));
                    arrayRand.splice(arrayRand.indexOf(clickedCellIndex), 1);

                    if (gameState[clickedCellIndex] !== "") { return; }

                    add_o_element(event);
                    playerTurn.src = "./assets/silver-x.svg";
                    gameState.splice(clickedCellIndex, 1, "o");

                    if(isPlayer_O_Turn == false) {
                        playCpu("x");
                    } 

                    console.log(clickedCellIndex + "clickedindex");
                    console.log(isPlayer_O_Turn);
                    

                    checkWin(); 
                    isPlayer_O_Turn = false;
                } 
            }   
        })
    }
}

function playCpu(mark) {
    let index = Math.floor(Math.random()*arrayRand.length);
    let random = arrayRand[index];
    let newElement = document.createElement('IMG');
    newElement.src = "./assets/icon-" + mark + ".svg";
    
    if(gameState[random] == "") {
        gameBoardDiv[random].appendChild(newElement);
        gameState.splice(random, 1, mark);
        arrayRand.splice(index, 1);
        checkWin();
    }
}

//to
function add_x_element(event) {
    let newElement = document.createElement('IMG');
    event.target.appendChild(newElement);
    newElement.src = "./assets/icon-x.svg";
    isPlayer_O_Turn = true;
}

function add_o_element(event) {
    let newElement = document.createElement('IMG');
    event.target.appendChild(newElement);
    newElement.src = "./assets/icon-o.svg";
    isPlayer_O_Turn = false;
}

function insertElement(event) {
    const clickedCellIndex = parseInt(event.target.getAttribute('index'));

    if (gameState[clickedCellIndex] !== "") { return; }
    if(isPlayer_O_Turn) {
        add_o_element(event);
        playerTurn.src = "./assets/silver-x.svg";
        gameState.splice(clickedCellIndex, 1, "o");
        gameBoardDiv.forEach(box => {
            box.classList.remove("o-hover");
            if(box.hasChildNodes() === false) {
                box.classList.add("x-hover");
            }
        })
    } else {
        add_x_element(event);
        playerTurn.src = "./assets/silver-o.svg";
        gameState.splice(clickedCellIndex, 1, "x");
        gameBoardDiv.forEach(box => {
            box.classList.remove("x-hover");
            if(box.hasChildNodes() === false) {
                box.classList.add("o-hover");
            }
        })
    }
}

function playGame() {
    gameBoardDiv.forEach(box => {
        box.classList.add("x-hover");
        box.onclick = (event) => {
            if(!gameEnd) {
                insertElement(event);  
                checkWin(); 
            } 
        }   
    })
}

function checkWin() {
    for(let i = 0; i < 8; i++ ) {
        const winCondition = WINNING_COMBINATIONS[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]]; 

        if (a === '' || b === '' || c === '') { continue; }
        if(a===b && b===c) {
            winnerReveal(a);
            styleWinnerCells(winCondition, a);
            return gameEnd = true;
        }
        if (!gameState.includes("")) {
            gameTied();
            return gameEnd = true;
        }
    }
}

function styleWinnerCells(winCondition, a){
    for(let j = 0; j < 3; j++ ) {
        let winnerCells = document.querySelector(`[index = "${winCondition[j]}"]`);
        
        if(a === "x") {
            winnerCells.style.backgroundColor = "#31C3BD";
            winnerCells.firstChild.src = "./assets/navy-x.svg";
        } else {
            winnerCells.style.backgroundColor = "#F2B137";
            winnerCells.firstChild.src = "./assets/navy-o.svg";
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

        if(multiplayer == true) {
            document.getElementById("winMessage").innerText = "PLAYER " + p1 + " IS WINNER!";
        } else { 
            document.getElementById("winMessage").innerText = "YOU WON!"; }

        xScore = countScore(xScore, "x-score");
        quit(1, ".won");
        nextRound(1, ".won"); 
    } else {
        document.querySelector(".lost").style.zIndex = "100";

        if(multiplayer == true) {
            document.getElementById("lostMessage").innerText = "PLAYER " + p2 + " IS WINNER!";
        } else { document.getElementById("lostMessage").innerText = "OH NO, YOU LOST…"; }

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
        insertCpulement();
    }
}

function reset() {
    isPlayer_O_Turn = false;
    gameEnd = false;
    gameState = ["", "", "", "", "", "", "", "", ""];
    arrayRand = [1, 2, 3, 4, 5, 6, 7, 8];
    playerTurn.src = "./assets/silver-x.svg";
    gameBoardDiv.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "#1F3641";
        box.classList.remove("o-hover");
        box.classList.add("x-hover");
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

function restart() {
    document.querySelector(".game__menu--restart").onclick = () => {
        document.querySelector(".restart").style.zIndex = "100";
        document.querySelector(".no").onclick = () => {
            document.querySelector(".restart").style.zIndex = "0";
        }
        document.querySelector(".yes").onclick = () => {
            document.querySelector(".restart").style.zIndex = "0";
            reset();
        }
    }
}
restart();