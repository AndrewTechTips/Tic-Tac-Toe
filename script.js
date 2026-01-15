/* -- Gameboard Module -- using an IIFE */

const Gameboard = (function() {

    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMarker = (index, marker) => {
        if(board[index] === "") {
            board[index] = marker;
            return true;
        }

        return false;
    };

    const resetBoard = () => board.fill("");

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

        if(Gameboard.placeMarker(index, activePlayer.marker)) {
            DisplayController.updateBoard();

            if(checkWin(Gameboard.getBoard())) {
                DisplayController.setResult(`${activePlayer.name} Wins!`);
                gameOver = true;
            } else if(checkTie(Gameboard.getBoard())) {
                DisplayController.setResult("It's a Tie!");
                gameOver = true;
            } else {
                switchPlayerTurn();
                DisplayController.setMessage(`${activePlayer.name}'s Turn`);
            }
        }
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        activePlayer = players[0];
        gameOver = false;
        DisplayController.updateBoard();
        DisplayController.setMessage(`${activePlayer.name}'s Turn`);
    };

    return {playRound, getActivePlayer, restartGame, setPlayerNames};

})();

const DisplayController = (function() {

    const boardDiv = document.getElementById("game-board");
    const statusMsg = document.getElementById("status-message");

    const setupScreen = document.getElementById("setup-screen");
    const gameScreen = document.getElementById("game-screen");

    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const backBtn = document.getElementById("back-btn");

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

    const setMessage = (msg) => {
        statusMsg.textContent = msg;
        statusMsg.style.color = "#444";
    };
    
        const setResult = (msg) => {
        statusMsg.textContent = msg;
        statusMsg.style.color = "#764ba2";
    };

    startBtn.addEventListener("click", () => {

        GameController.setPlayerNames(p1Input.value, p2Input.value);

        setupScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        GameController.restartGame();
    });

    restartBtn.addEventListener("click", () => GameController.restartGame());

    backBtn.addEventListener("click", () => {
        gameScreen.classList.add("hidden");
        setupScreen.classList.remove("hidden");
        GameController.restartGame()
    })

    return { updateBoard, setMessage, setResult};

})();
