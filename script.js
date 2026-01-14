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

        if(!moveSuccessfull) {
            console.log("This spot is already taken! Please choose another");
            return;
        }

        const board = Gameboard.getBoard();

        if(checkWin(board)) {
            Gameboard.printBoard();
            console.log(`Winner: ${getActivePlayer().name} !`);
            return;
        }

        if(checkTie(board)) {
            Gameboard.printBoard();
            console.log("Its a tie!");
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {playRound, getActivePlayer};

})();

GameController.playRound(0);
GameController.playRound(4);
GameController.playRound(1);
GameController.playRound(7);
GameController.playRound(2);
