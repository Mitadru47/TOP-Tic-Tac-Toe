// Module:
const modules = (function (){

    const gameBoard = (array) => { return {array} } ;
    const displayController = (state) => { return {state} };

    return { gameBoard, displayController };
})();

const board = modules.gameBoard(["","","","","","","","",""]);
// console.log(board);

// Factory Function:
const createPlayer = function (name, type){
    return { name, type };
}

function renderGameboard(){

    let gameBoardSlots = document.querySelectorAll(".gameBoard div");
    gameBoardSlots.forEach((slot, key) => {

        // console.log(key, slot); 
        slot.innerText = board.array[key];
    });

    let restartButton = document.querySelector("#restart");
    restartButton.addEventListener("click", () => document.location.reload(), true);
}

// renderGameboard();

function handleInput(player1, player2){

    let turnCounter = modules.displayController(1);
    console.log(turnCounter);

    let title = document.querySelector(".title");
    title.innerText = player1.name + "'s Turn!"

    // let stat1 = document.querySelector(".stat1");
    // stat1.innerText = player1.name;

    let stat2 = document.querySelector(".stat2");
    stat2.innerText = player1.type;

    let gameBoardSlots = document.querySelectorAll(".gameBoard div");
    gameBoardSlots.forEach((slot) => {

        slot.addEventListener("click", function (){
            
            if((turnCounter.state % 2) === 0 && (slot.innerText === "")){

                board.array[Number(slot.id.substring(4)) - 1] = player2.type;
                renderGameboard();

                turnCounter.state = turnCounter.state + 1;

                title.innerText = player1.name + "'s Turn!"
                stat2.innerText = player1.type;

                if(turnCounter.state >= 6){
                    
                    let winner = checkGameStatus(player2);
                    if(winner.type === "X" || winner.type === "O"){

                        title.innerText = winner.name + " Wins!";
                        stat2.innerText = winner.type;

                        let gameBoard = document.querySelector(".gameBoard");
                        gameBoard.style.pointerEvents = "none";
                    }

                    else if(turnCounter.state === 10){

                        title.innerText = "No One Wins!";
                        stat2.style.display = "none";

                        let gameBoard = document.querySelector(".gameBoard");
                        gameBoard.style.pointerEvents = "none";
                    }
                }

                console.log(slot.id);
                console.log(turnCounter);

            } else if((turnCounter.state % 2) !== 0 && (slot.innerText === "")){

                board.array[Number(slot.id.substring(4)) - 1] = player1.type;
                renderGameboard();

                turnCounter.state = turnCounter.state + 1;

                title.innerText = player2.name + "'s Turn!"
                stat2.innerText = player2.type;

                if(turnCounter.state >= 6){

                    let winner = checkGameStatus(player1);
                    if(winner.type === "X" || winner.type === "O"){

                        title.innerText = winner.name + " Wins!";
                        stat2.innerText = winner.type;

                        let gameBoard = document.querySelector(".gameBoard");
                        gameBoard.style.pointerEvents = "none";
                    }
                
                    else if(turnCounter.state === 10){

                        title.innerText = "No One Wins!";
                        stat2.style.display = "none";

                        let gameBoard = document.querySelector(".gameBoard");
                        gameBoard.style.pointerEvents = "none";
                    }
                }

                console.log(slot.id);
                console.log(turnCounter);
            }

            // console.log(slot);
    
        }, true);
    });
}

function handleAI(player1, player2){

    let gameEnd = false;

    let turnCounter = modules.displayController(1);
    console.log(turnCounter);

    let title = document.querySelector(".title");
    title.innerText = player1.name + "'s Turn!"

    // let stat1 = document.querySelector(".stat1");
    // stat1.innerText = player1.name;

    let stat2 = document.querySelector(".stat2");
    stat2.innerText = player1.type;

    let gameBoardSlots = document.querySelectorAll(".gameBoard div");
    gameBoardSlots.forEach((slot) => {

        slot.addEventListener("click", function (){

            if((turnCounter.state % 2) !== 0 && (slot.innerText === "")){

                board.array[Number(slot.id.substring(4)) - 1] = player1.type;
                renderGameboard();

                turnCounter.state = turnCounter.state + 1;

                title.innerText = player2.name + "'s Turn!"
                stat2.innerText = player2.type;

                if(turnCounter.state >= 6){

                    let winner = checkGameStatus(player1);
                    if(winner.type === "X" || winner.type === "O"){

                        title.innerText = winner.name + " Wins!";
                        stat2.innerText = winner.type;

                        let gameBoard = document.querySelector(".gameBoard");
                        gameBoard.style.pointerEvents = "none";

                        gameEnd = true;
                    }
                
                    else if(turnCounter.state === 10){

                        title.innerText = "No One Wins!";
                        stat2.style.display = "none";

                        let gameBoard = document.querySelector(".gameBoard");
                        gameBoard.style.pointerEvents = "none";

                        gameEnd = true;
                    }
                }

                console.log(slot.id);
                console.log(turnCounter);

                // AI's Turn

                if(!gameEnd){
                    
                    setTimeout(()=>{

                        //Generate Move

                        let move = 0;
                        let flag = true;

                        while(flag){

                            move = Math.round(Math.random() * 8);

                            if(board.array[move] === ""){
                                
                                flag = false;
                                console.log(move);
                            }
                        }
                        
                        board.array[move] = player2.type;
                        renderGameboard();

                        turnCounter.state = turnCounter.state + 1;

                        title.innerText = player1.name + "'s Turn!"
                        stat2.innerText = player1.type;

                        if(turnCounter.state >= 6){
                        
                            let winner = checkGameStatus(player2);
                            if(winner.type === "X" || winner.type === "O"){
        
                                title.innerText = winner.name + " Wins!";
                                stat2.innerText = winner.type;
        
                                let gameBoard = document.querySelector(".gameBoard");
                                gameBoard.style.pointerEvents = "none";

                                gameEnd = true;
                            }
        
                            else if(turnCounter.state === 10){
        
                                title.innerText = "No One Wins!";
                                stat2.style.display = "none";
        
                                let gameBoard = document.querySelector(".gameBoard");
                                gameBoard.style.pointerEvents = "none";

                                gameEnd = true;
                            }
                        }
                        
                    }, 1000); 
                }  
            }
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
        
        return player;
    } 

    return "None";
}

function startGame(){

    let player1 = {};
    let player2 = {};

    let xButton = document.querySelector("#X");
    xButton.addEventListener("click", function (){

        console.log("X Button Clicked!");

        let buttonContainer = document.querySelector(".buttonContainer");
        buttonContainer.style.gap = "0px";

        let oButton = document.querySelector("#O");
        oButton.style.display = "none";

        let options = document.querySelector("form");
        options.style.display = "block";

        let player1Options = document.querySelector(".player1");
        player1Options.style.display = "flex";

        let player2Options = document.querySelector(".player2");
        player2Options.style.display = "none";

        let player1Name = document.querySelector(".player1 input");
        // console.log(player1Name.value);

        let player1Done = document.querySelector(".player1 .done");
        player1Done.addEventListener("click", (event) => {

            event.preventDefault();
            if(player1Name.value !== ""){

                player1 = createPlayer(player1Name.value, "X");
                
                xButton.style.display = "none";
                oButton.style.display = "inline-block";

                player1Options.style.display = "none";
                player2Options.style.display = "flex";

                console.log(player1);

                let player2Name = document.querySelector(".player2 input");
                // console.log(player2Name.value);

                let player2Done = document.querySelector(".player2 .done");
                player2Done.addEventListener("click", (event) => {

                    event.preventDefault();
                    if((player2Name.value !== "") && (player1.name !== player2Name.value)){

                        player2 = createPlayer(player2Name.value, "O");
                        console.log(player2);

                        let sectionA_Buttons = document.querySelector(".sectionA .buttons");
                        sectionA_Buttons.style.display = "none";

                        let sectionB = document.querySelector(".sectionB");
                        sectionB.style.display = "flex";

                        console.log(player1, player2);

                        renderGameboard();
                        handleInput(player1, player2);
                    }

                }, true);

                let aiButton = document.querySelector("#ai");
                aiButton.style.display = "inline-block";

                aiButton.addEventListener("click", ()=>{

                    player2 = createPlayer("AI", "O");
                    console.log(player2);

                    let sectionA_Buttons = document.querySelector(".sectionA .buttons");
                    sectionA_Buttons.style.display = "none";

                    let sectionB = document.querySelector(".sectionB");
                    sectionB.style.display = "flex";

                    console.log(player1, player2);

                    renderGameboard();
                    handleAI(player1, player2);

                }, true);
            }

        }, true);

    }, true);

    let oButton = document.querySelector("#O");
    oButton.addEventListener("click", function (){

        console.log("O Button Clicked!");

        let buttonContainer = document.querySelector(".buttonContainer");
        buttonContainer.style.gap = "0px";

        let xButton = document.querySelector("#X");
        xButton.style.display = "none";

        let options = document.querySelector("form");
        options.style.display = "block";

        let player1Options = document.querySelector(".player1");
        player1Options.style.display = "flex";

        let player2Options = document.querySelector(".player2");
        player2Options.style.display = "none";

        let player1Name = document.querySelector(".player1 input");
        // console.log(player1Name.value);

        let player1Done = document.querySelector(".player1 .done");
        player1Done.addEventListener("click", (event) => {

            event.preventDefault();
            if(player1Name.value !== ""){

                player1 = createPlayer(player1Name.value, "O");

                oButton.style.display = "none";
                xButton.style.display = "inline-block";
                
                player1Options.style.display = "none";
                player2Options.style.display = "flex";

                console.log(player1);

                let player2Name = document.querySelector(".player2 input");
                // console.log(player2Name.value);

                let player2Done = document.querySelector(".player2 .done");
                player2Done.addEventListener("click", (event) => {

                    event.preventDefault();
                    if((player2Name.value !== "") && (player1.name !== player2Name.value)){

                        player2 = createPlayer(player2Name.value, "X");
                        console.log(player2);

                        let sectionA_Buttons = document.querySelector(".sectionA .buttons");
                        sectionA_Buttons.style.display = "none";
                
                        let sectionB = document.querySelector(".sectionB");
                        sectionB.style.display = "flex";
                
                        console.log(player1, player2);
                
                        renderGameboard();
                        handleInput(player1, player2);
                    }

                }, true);

                let aiButton = document.querySelector("#ai");
                aiButton.style.display = "inline-block";

                aiButton.addEventListener("click", ()=>{

                    player2 = createPlayer("AI", "X");
                    console.log(player2);

                    let sectionA_Buttons = document.querySelector(".sectionA .buttons");
                    sectionA_Buttons.style.display = "none";

                    let sectionB = document.querySelector(".sectionB");
                    sectionB.style.display = "flex";

                    console.log(player1, player2);

                    renderGameboard();
                    handleAI(player1, player2);

                }, true);
            }

        }, true);
        
    }, true);
}

startGame();