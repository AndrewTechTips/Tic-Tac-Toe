/* -- Gameboard Module -- using an IIFE */

const Gameboard = (function() {

    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMarker = (index, marker) => {
        if(board[index] === "") {
            board[index] = marker;
            return true;
        }

        return false;
    };

    const resetBoard = () => {
        for(let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    return {getBoard, placeMarker, resetBoard};

})();

/* -- Player Factory --*/

const Player = (name, marker) => {
    return {name, marker};
};

/* -- GameController Module -- using again iife*/

const GameController = (function() {

    let players = [
        Player("Player One", "X"),
        Player("Player Two", "O")
    ];

    let activePlayer = players[0];
    let gameOver = false;

    const setPlayerNames = (name1, name2) => {
        players[0].name = name1 === "" ? "Player One" : name1;
        players[1].name = name2 === "" ? "Player Two" : name2;
    };

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const checkWin = (board) => {

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],    //Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],    //Columns
            [0, 4, 8], [2, 4, 6]                //Diagonals      
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];

            if(
                board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                return true;
            }
        }
        return false
    };

    const checkTie = (board) => {
        return board.every(cell => cell !== "");
    };

    const playRound = (index) => {

        if(gameOver) {
            return;
        }

        const moveSuccessfull = Gameboard.placeMarker(index, getActivePlayer().marker);

        if(moveSuccessfull) {
           
            if(checkWin(Gameboard.getBoard())) {
                DisplayController.updateBoard();
                DisplayController.setResult(`${activePlayer.name} Wins!`);
                gameOver = true;
                return;
            }

            if(checkTie(Gameboard.getBoard())) {
                DisplayController.updateBoard();
                DisplayController.setResult("It's a Tie!");
                gameOver = true;
                return;
            }

            switchPlayerTurn();
            DisplayController.updateBoard();
            DisplayController.setMessage(`${activePlayer.name}'s turn (${activePlayer.marker})`);
        }
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        activePlayer = players[0];
        gameOver = false;
        DisplayController.updateBoard();
        DisplayController.setMessage(`${activePlayer.name}'s turn (${activePlayer.marker})`);
    };

    return {playRound, getActivePlayer, restartGame, setPlayerNames};

})();

const DisplayController = (function() {

    const boardDiv = document.getElementById("game-board");
    const statusMsg = document.getElementById("status-message");
    const restartBtn = document.getElementById("restart-btn");

    const setupScreen = document.getElementById("setup-screen");
    const gameScreen = document.getElementById("game-screen");
    const startBtn = document.getElementById("start-btn");

    const p1Input = document.getElementById("player1-name");
    const p2Input = document.getElementById("player2-name");

    const updateBoard = () => {
        boardDiv.innerHTML = "";

        const board = Gameboard.getBoard();

        board.forEach( (cell, index) => {

            const cellBtn = document.createElement("div");
            cellBtn.classList.add("cell");

            if(cell === "X") {
                cellBtn.classList.add("x");
            }
            
            if(cell === "O") {
                cellBtn.classList.add("o");
            }

            cellBtn.textContent = cell;

            cellBtn.addEventListener("click", () => GameController.playRound(index));

            boardDiv.appendChild(cellBtn);
        });
    };

    const setMessage = (msg) => statusMsg.textContent = msg;
    const setResult = (msg) => {
        statusMsg.textContent = msg;
        statusMsg.style.color = "#e74c3c";
    };

    startBtn.addEventListener("click", () => {

        GameController.setPlayerNames(p1Input.value, p2Input.value);

        setupScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        GameController.restartGame();
    });

    restartBtn.addEventListener("click", () => {

        GameController.restartGame();
        statusMsg.style.color = "#555";
    });

    return { updateBoard, setMessage, setResult};

})();
