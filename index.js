// Module:
const modules = (function (){

    const gameBoard = (array) => { return {array} } ;
    const displayController = (state) => { return {state} };

    return { gameBoard, displayController };
})();

const board = modules.gameBoard(["X","O","X","O","X","O","X","O","X"]);
// console.log(board);

// Factory Function:
const createPlayer = function (type){
    return { type };
}

function renderGameboard(){

    let gameBoardSlots = document.querySelectorAll(".gameBoard div");
    gameBoardSlots.forEach((slot, key) => {

        // console.log(key, slot); 
        slot.innerText = board.array[key];
    });
}

// renderGameboard();

function handleInput(player1, player2){

    let turnCounter = modules.displayController(1);
    console.log(turnCounter);

    let gameBoardSlots = document.querySelectorAll(".gameBoard div");
    gameBoardSlots.forEach((slot) => {

        slot.addEventListener("click", function (){

            if((turnCounter.state % 2) === 0 && (slot.innerText === "")){

                slot.innerText = player2.type;
                turnCounter.state = turnCounter.state + 1;

                console.log(turnCounter);

            } else if((turnCounter.state % 2) !== 0 && (slot.innerText === "")){

                slot.innerText = player1.type
                turnCounter.state = turnCounter.state + 1;

                console.log(turnCounter);
            }

            // console.log(slot);
    
        }, true);
    });
}

function startGame(){

    let player1 = {};
    let player2 = {};

    let xButton = document.querySelector("#X");
    xButton.addEventListener("click", function (){

        console.log("X Button Clicked!");

        player1 = createPlayer("X");
        player2 = createPlayer("O")

        // console.log(player1, player2);
        handleInput(player1, player2);

    }, true);

    let oButton = document.querySelector("#O");
    oButton.addEventListener("click", function (){

        console.log("O Button Clicked!");

        player1 = createPlayer("O");
        player2 = createPlayer("X");

        console.log(player1, player2);

        // console.log(player1, player2);
        handleInput(player1, player2);

    }, true);
}

startGame();