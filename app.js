const square = document.getElementsByClassName("squares");
const playerOne = document.getElementsByClassName("player-1")[0];
const playerOneScore = document.getElementsByClassName("score")[0];
const playerTwo = document.getElementsByClassName("player-2")[0];
const playerTwoScore = document.getElementsByClassName("score")[1];
const wrapper = document.getElementById("wrapper");
const resultScreen = document.getElementById("result-screen");
let playerTwoTurn = false;
let turn = 0;

function switchBlur(check) {
    if (check) {
        wrapper.style.filter = "blur(10px)";
    } else {
        wrapper.style.filter = "blur(0px)";
    }
}

function DisplayResult(result) {
    resultScreen.style.display = "flex";
    const name = document.createElement("div");
    name.className = "resultScreenMessage";
    switchBlur(true);
    if (result == "one") {
        name.innerText = "PLAYER 1 WINS!!";
        playerOneScore.innerText++;
    } else if (result == "two") {
        name.innerText = "PLAYER 2 WINS!!";
        playerTwoScore.innerText++;
    } else {
        name.innerText = "DRAW!";
    }
    resultScreen.className = "resultScreen";
    resultScreen.appendChild(name);
    document.body.append(resultScreen);
}

function startGame() {
    switchBlur();
    resultScreen.innerHTML = "";
    resultScreen.style.display = "none";
    turn = 0;
    playerTwoTurn = false;
    for (let tile of square) {
        if (tile.style.pointerEvents == "none") {
            tile.style.cssText = "";
            tile.removeChild(tile.lastChild);
            if (tile.classList[2] == "cross") {
                tile.classList.remove("cross");
            } else {
                tile.classList.remove("circle");
            }
        }
    }
}

document.body.addEventListener("click", (e) => {
    const clickedSquare = e.target;
    if (clickedSquare.classList[0] == "squares") {
        turn++;
        if (!playerTwoTurn) {
            playerOne.style.cssText +=
                "transform : scale(100%); transition : transform 250ms ease;";
            playerTwo.style.cssText +=
                "transform : scale(130%); transition : transform 250ms ease;";
            const toFill = document.createElement("img");
            toFill.className = "circle-img";
            toFill.src = "./assets/circle.png";
            clickedSquare.append(toFill);
            clickedSquare.className += " circle";
            clickedSquare.style.cssText += "pointer-events:none;";
            playerTwoTurn = !playerTwoTurn;
        } else {
            playerTwo.style.cssText +=
                "transform : scale(100%); transition : transform 250ms ease;";
            playerOne.style.cssText +=
                "transform : scale(130%); transition : transform 250ms ease;";
            const toFill = document.createElement("img");
            toFill.className = "cross-img";
            toFill.src = "./assets/cross.png";
            clickedSquare.append(toFill);
            clickedSquare.className += " cross";
            clickedSquare.style.cssText += "pointer-events:none;";
            playerTwoTurn = !playerTwoTurn;
        }
        const winConditionHorizontal =
            (square[0].classList.length != 2 &&
                square[0].classList[2] == square[1].classList[2] &&
                square[2].classList[2] == square[1].classList[2]) ||
            (square[3].classList.length != 2 &&
                square[3].classList[2] == square[4].classList[2] &&
                square[3].classList[2] == square[5].classList[2]) ||
            (square[6].classList.length != 2 &&
                square[6].classList[2] == square[7].classList[2] &&
                square[6].classList[2] == square[8].classList[2]);
        const winConditionVertical =
            (square[0].classList.length != 2 &&
                square[0].classList[2] == square[3].classList[2] &&
                square[0].classList[2] == square[6].classList[2]) ||
            (square[1].classList.length != 2 &&
                square[1].classList[2] == square[4].classList[2] &&
                square[1].classList[2] == square[7].classList[2]) ||
            (square[2].classList.length != 2 &&
                square[2].classList[2] == square[5].classList[2] &&
                square[2].classList[2] == square[8].classList[2]);
        const winConditionalDiagonal =
            (square[0].classList.length != 2 &&
                square[0].classList[2] == square[4].classList[2] &&
                square[0].classList[2] == square[8].classList[2]) ||
            (square[2].classList.length != 2 &&
                square[2].classList[2] == square[4].classList[2] &&
                square[2].classList[2] == square[6].classList[2]);

        if (
            winConditionHorizontal ||
            winConditionVertical ||
            winConditionalDiagonal
        ) {
            if (turn % 2 == 0) {
                console.log("Player 2 Wins");
                DisplayResult("two");
                setTimeout(startGame, 1200);
            } else {
                console.log("Player 1 Wins");
                DisplayResult("one");
                setTimeout(startGame, 1200);
            }
        } else {
            if (turn == 9) {
                DisplayResult("draw");
                setTimeout(startGame, 1200);
            }
        }
    }
});
