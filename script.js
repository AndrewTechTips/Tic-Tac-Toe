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

    const printBoard = () => {
        console.log("Current Board:");
        console.log(board[0] + " | " + board[1] + " | " + board[2]);
        console.log(board[3] + " | " + board[4] + " | " + board[5]);
        console.log(board[6] + " | " + board[7] + " | " + board[8]);
    };

    const resetBoard = () => {
        for(let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    return {getBoard, placeMarker, printBoard, resetBoard};

})();