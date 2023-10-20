// Module:
const modules = (function (){

    const gameBoard = (array) => { return {array} } ;
    const displayController = (state) => { return {state} };

    return { gameBoard, displayController };
})();

const board = modules.gameBoard(["","","","","","","","",""]);
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

                board.array[Number(slot.id.substring(4)) - 1] = player2.type;
                renderGameboard();

                turnCounter.state = turnCounter.state + 1;

                if(turnCounter.state >= 6){
                    checkGameStatus(player2);
                }
                
                if(turnCounter.state === 10){
                    console.log("Tie!");
                }

                console.log(slot.id);
                console.log(turnCounter);

            } else if((turnCounter.state % 2) !== 0 && (slot.innerText === "")){

                board.array[Number(slot.id.substring(4)) - 1] = player1.type;
                renderGameboard();

                turnCounter.state = turnCounter.state + 1;

                if(turnCounter.state >= 6){
                    checkGameStatus(player1);
                }

                if(turnCounter.state === 10){
                    console.log("Tie!");
                }

                console.log(slot.id);
                console.log(turnCounter);
            }

            // console.log(slot);
    
        }, true);
    });
}

function checkGameStatus(player){
    
    if(((board.array[0] === board.array[1]) && (board.array[0] === board.array[2]) && (board.array[0] !== ""))
    || ((board.array[3] === board.array[4]) && (board.array[3] === board.array[5]) && (board.array[3] !== ""))
    || ((board.array[6] === board.array[7]) && (board.array[6] === board.array[8]) && (board.array[6] !== ""))){
        
        console.log("\"" + player.type + "\" 1 Wins!");
    } 
    
    else if(((board.array[0] === board.array[3]) && (board.array[0] === board.array[6]) && (board.array[0] !== ""))
    || ((board.array[1] === board.array[4]) && (board.array[1] === board.array[7] && (board.array[1] !== "")))
    || ((board.array[2] === board.array[5]) && (board.array[2] === board.array[8] && (board.array[2] !== "")))){
        
        console.log("\"" + player.type + "\" 2 Wins!");
    } 

    else if(((board.array[0] === board.array[4]) && (board.array[0] === board.array[8]) && (board.array[0] !== ""))
    || ((board.array[2] === board.array[4]) && (board.array[2] === board.array[6]) && (board.array[2] !== ""))){
        
        console.log("\"" + player.type + "\" 3 Wins!");
    } 

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

        renderGameboard();
        handleInput(player1, player2);

    }, true);

    let oButton = document.querySelector("#O");
    oButton.addEventListener("click", function (){

        console.log("O Button Clicked!");

        player1 = createPlayer("O");
        player2 = createPlayer("X");

        console.log(player1, player2);

        // console.log(player1, player2);

        renderGameboard();
        handleInput(player1, player2);

    }, true);
}

startGame();