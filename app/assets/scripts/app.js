let ceil = document.getElementsByClassName("game-item"),
    table = document.getElementById("game"),
    reset = document.getElementById("reset-game"),
    message = document.getElementById("message"),
    player = "x",
    stepCount = 0,
    winCombinations = [
        "123",
        "147",
        "159",
        "258",
        "369",
        "357",
        "456",
        "789"
    ],
    playerSequence = {
        x: "",
        o: "",
    };

table.addEventListener("click", currentStep);

function currentStep(event) {
    let currentTarget = event.target;
    let num = +currentTarget.getAttribute("data-ceil");

    if (!currentTarget.textContent) {
        currentTarget.innerText = player;

        playerSequence[player] += num;
        currentTarget.classList.add(player);

        if (playerSequence[player].length > 2 && isWin(playerSequence[player])) {
            table.removeEventListener("click", currentStep);
            return (message.innerText = "Победил игрок " + player);
        }

        changePlayer();
        stepCount++;
        stepCount === 9
            ? (message.innerText = "Ничья")
            : (message.innerText = "Ходит игрок " + player);
    }
}

function changePlayer() {
    player === "x" ? (player = "o") : (player = "x");
}

reset.addEventListener("click", function() {
    table.addEventListener("click", currentStep);
    playerSequence = {
        x: "",
        o: "",
    };
    player = "o";
    stepCount = 0;
    message.innerText = "Ходит игрок " + player;
    for (let i = 0; i < ceil.length; i++) {
        ceil[i].innerText = "";
    }
});

function isWin(sequence) {
    return winCombinations.some(function(elem) {
        return elem === sequence;
    });
}
