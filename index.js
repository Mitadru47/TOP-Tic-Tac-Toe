// Module:
const modules = (function (){

    const gameBoard = (array) => { return {array} } ;
    const displayController = (state) => { return {state} };

    return { gameBoard, displayController };
})();

const board = modules.gameBoard(["X","O","X","O","X","O","X","O","X"]);
// console.log(board);

// Factory Function:
const createPlayer = function (name, turn){
    return { name, turn };
}

function renderGameboard(){

    let gameBoardSlots = document.querySelectorAll(".gameBoard div");
    gameBoardSlots.forEach((slot, key) => {

        // console.log(key, slot); 
        slot.innerText = board.array[key];
    });
}

renderGameboard();