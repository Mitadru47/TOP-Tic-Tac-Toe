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

    let stats = document.querySelector(".stats");
    stats.innerText = player1.type;

    let gameBoardSlots = document.querySelectorAll(".gameBoard div");
    gameBoardSlots.forEach((slot) => {

        slot.addEventListener("click", function (){

            if((turnCounter.state % 2) === 0 && (slot.innerText === "")){

                board.array[Number(slot.id.substring(4)) - 1] = player2.type;
                renderGameboard();

                turnCounter.state = turnCounter.state + 1;
                stats.innerText = player1.type;

                if(turnCounter.state >= 6){
                    
                    let winner = checkGameStatus(player2);
                    if(winner === "X" || winner === "O"){

                        stats.innerText = winner + " Wins!";

                        let gameBoard = document.querySelector(".gameBoard");
                        gameBoard.style.pointerEvents = "none";

                        let restartButton = document.querySelector("#restart");
                        restartButton.style.display = "block";

                        restartButton.addEventListener("click", () => document.location.reload(), true);
                    }
                }

                if(turnCounter.state === 10){
                    
                    console.log("Tie!");

                    let gameBoard = document.querySelector(".gameBoard");
                    gameBoard.style.pointerEvents = "none";

                    let restartButton = document.querySelector("#restart");
                    restartButton.style.display = "block";

                    restartButton.addEventListener("click", () => document.location.reload(), true);
                }

                console.log(slot.id);
                console.log(turnCounter);

            } else if((turnCounter.state % 2) !== 0 && (slot.innerText === "")){

                board.array[Number(slot.id.substring(4)) - 1] = player1.type;
                renderGameboard();

                turnCounter.state = turnCounter.state + 1;
                stats.innerText = player2.type;

                if(turnCounter.state >= 6){

                    let winner = checkGameStatus(player1);
                    if(winner === "X" || winner === "O"){

                        stats.innerText = winner + " Wins!";

                        let gameBoard = document.querySelector(".gameBoard");
                        gameBoard.style.pointerEvents = "none";

                        let restartButton = document.querySelector("#restart");
                        restartButton.style.display = "block";

                        restartButton.addEventListener("click", () => document.location.reload(), true);
                    }
                }

                if(turnCounter.state === 10){

                    stats.innerText = "Tie!";

                    let gameBoard = document.querySelector(".gameBoard");
                    gameBoard.style.pointerEvents = "none";

                    let restartButton = document.querySelector("#restart");
                    restartButton.style.display = "block";

                    restartButton.addEventListener("click", () => document.location.reload(), true);
                }

                console.log(slot.id);
                console.log(turnCounter);
            }

            // console.log(slot);
    
        }, true);
    });
}

function checkGameStatus(player){
    
    if((((board.array[0] === board.array[1]) && (board.array[0] === board.array[2]) && (board.array[0] !== ""))
    || ((board.array[3] === board.array[4]) && (board.array[3] === board.array[5]) && (board.array[3] !== ""))
    || ((board.array[6] === board.array[7]) && (board.array[6] === board.array[8]) && (board.array[6] !== "")))    
    ||
    (((board.array[0] === board.array[3]) && (board.array[0] === board.array[6]) && (board.array[0] !== ""))
    || ((board.array[1] === board.array[4]) && (board.array[1] === board.array[7] && (board.array[1] !== "")))
    || ((board.array[2] === board.array[5]) && (board.array[2] === board.array[8] && (board.array[2] !== ""))))
    ||
    (((board.array[0] === board.array[4]) && (board.array[0] === board.array[8]) && (board.array[0] !== ""))
    || ((board.array[2] === board.array[4]) && (board.array[2] === board.array[6]) && (board.array[2] !== "")))){
        
        return player.type;
    } 

}

function startGame(){

    let player1 = {};
    let player2 = {};

    let xButton = document.querySelector("#X");
    xButton.addEventListener("click", function (){

        console.log("X Button Clicked!");

        player1 = createPlayer("X");
        player2 = createPlayer("O");

        let sectionA_Buttons = document.querySelector(".sectionA .buttons");
        sectionA_Buttons.style.display = "none";

        let sectionB = document.querySelector(".sectionB");
        sectionB.style.display = "flex";

        // console.log(player1, player2);

        renderGameboard();
        handleInput(player1, player2);

    }, true);

    let oButton = document.querySelector("#O");
    oButton.addEventListener("click", function (){

        console.log("O Button Clicked!");

        player1 = createPlayer("O");
        player2 = createPlayer("X");

        let sectionA = document.querySelector(".sectionA");
        sectionA.style.display = "none";

        let sectionB = document.querySelector(".sectionB");
        sectionB.style.display = "flex";

        // console.log(player1, player2);

        renderGameboard();
        handleInput(player1, player2);

    }, true);
}

startGame();