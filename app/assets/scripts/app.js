let ceil = document.getElementsByClassName("game-item"),
    table = document.getElementById("game"),
    reset = document.getElementById("reset-game"),
    message = document.getElementById("message"),
    player = "x",
    stepCount = 0,
    winCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
    ],
    playerSequence = {
        x: [],
        o: [],
    };

table.addEventListener("click", currentStep);

function currentStep(event) {
    let currentTarget = event.target;
    let num = +currentTarget.getAttribute("data-ceil");
  console.log('Hello my friend')
    if (!currentTarget.textContent) {
        currentTarget.innerText = player;

        playerSequence[player] += num;
        currentTarget.classList.add(player);

        if (isWin(playerSequence[player])) {
            table.removeEventListener("click", currentStep);
            return (message.innerText = "Победил игрок " + player);
        } else {
            changePlayer();
            stepCount++;
            stepCount === 9
                ? (message.innerText = "Ничья")
                : (message.innerText = "Ходит игрок " + player);
        }
    }
}

function changePlayer() {
    player === "x" ? (player = "o") : (player = "x");
}

reset.addEventListener("click", function() {
    table.addEventListener("click", currentStep);
    playerSequence = {
        x: [],
        o: [],
    };
    player = "x";
    stepCount = 0;
    message.innerText = "Ходит игрок " + player;

    for (let i = 0; i < ceil.length; i++) {
        ceil[i].innerText = "";
    }
});

function isWin(sequence) {
    if (sequence.length < 3) return false;

    return winCombinations.some(function(element) {
        return element.every(function (el) {
            return sequence.includes(el);
        })
    });
}
