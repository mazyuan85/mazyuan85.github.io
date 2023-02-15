const playerClicks = document.querySelectorAll("td");
const resetButton = document.getElementById("reset");
const playerHeader = document.getElementById("playerTurn");
const moves = {
    "0": "",
    "1": "O",
    "-1": "X",
};
const boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
let currentTurn = 0;
let gameWon = false;

playerClicks.forEach(function (playerClick) {
    playerClick.addEventListener("click", function (evt) {
        handleClick(evt);

    });
});

function handleClick(evt) {
    if ((evt.target.innerText === "") && (gameWon === false)) {    
    checkTurn();
    boardData[evt.target.id[3]][evt.target.id[1]] = currentTurn;
    renderBoard();
    checkWinner();
    };   
};

function checkWinner() {
    for (let col = 0; col < boardData.length; col++) {
        if ((boardData[col][0] === 1 && boardData[col][1] === 1 && boardData[col][2] === 1) || (boardData[col][0] === -1 && boardData[col][1] === -1 && boardData[col][2] === -1)) {
            gameWon = true;
        }
    }
    for (let row = 0; row < boardData.length; row++) {
        if ((boardData[0][row] === 1 && boardData[1][row] === 1 && boardData[2][row] === 1) || (boardData[0][row] === -1 && boardData[1][row] === -1 && boardData[2][row] === -1)) {
            gameWon = true;
        }
    }
    if ((boardData[0][0] === 1 && boardData[1][1] === 1 && boardData[2][2] === 1) || (boardData[0][0] === -1 && boardData[1][1] === -1 && boardData[2][2] === -1)) {
        gameWon = true;
    }
    if ((boardData[0][2] === 1 && boardData[1][1] === 1 && boardData[2][0] === 1) || (boardData[0][2] === -1 && boardData[1][1] === -1 && boardData[2][0] === -1)) {
        gameWon = true;
    }
    endGame()
};

function endGame() {
    if (gameWon === true && currentTurn === 1) {
        playerHeader.innerText = "Player 1's Has WON!";        
    }
    if (gameWon === true && currentTurn === -1) {
        playerHeader.innerText = "Player 2's Has WON!";   
    } 
    let draw = true;
    for (let i = 0; i < boardData.length; i++) {
        for (let j = 0; j < boardData[i].length; j++) {
            if (boardData[i][j] === 0) {
                draw = false;
                break;
            }
        }
    }
    if (draw === true && gameWon === false) {
        playerHeader.innerText = "It's a draw!";
    }
};

function checkTurn() {
    if (currentTurn !== 1) {
        playerHeader.innerText = "Player 2's Turn";
        return currentTurn = 1;
    } else {
        playerHeader.innerText = "Player 1's Turn";
        return currentTurn = -1;
    }
};

function renderBoard() {
    for (let i = 0; i < boardData.length; i++) {
        for (let j = 0; j < boardData[i].length; j++) {
            const cellId = `r${j}c${i}`;
            const cellEl = document.getElementById(cellId);
            cellEl.innerText = moves[boardData[i][j]];
        }
    }
};

resetButton.addEventListener("click", resetBoard);

function resetBoard() {
    for (let i = 0; i < boardData.length; i++) {
        for (let j = 0; j < boardData[i].length; j++) {
            boardData[i][j] = 0;
        }
    }
    currentTurn = 0;
    gameWon = false;
    playerHeader.innerText = "Player 1's Turn";
    renderBoard();
};