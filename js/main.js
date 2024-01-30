let vsMachine = true;
const gameModeSwitch = document.getElementById('gameModeSwitch');

function handleGameModeChange(checkbox) {
    if (checkbox.checked) {
      // Modo de juego contra la máquina
      alert('Cambiaste a jugar contra la máquina');
      vsMachine = true;
    } else {
      // Modo de juego contra un amigo
      alert('Cambiaste a jugar contra un amigo');
      vsMachine = false;
    }
}

document.getElementById('toggleBtn').addEventListener('click', function () {

    const bgDarkElements = document.querySelectorAll('.bg-dark');
    const bgLightElements = document.querySelectorAll('.bg-light');
    const btnLightElements = document.querySelectorAll('.btn-outline-light');
    const btnDarkElements = document.querySelectorAll('.btn-outline-dark');
    const textLightElements = document.querySelectorAll('.text-light');
    const textDarkElements = document.querySelectorAll('.text-dark');
    const buttonChange = document.querySelector('#toggleBtn');
    const icon = buttonChange.querySelector('i');
    const buttonText = buttonChange.querySelector('span');

    if (buttonChange.classList.contains('btn-outline-light')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        buttonText.textContent = ' Dark';
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        buttonChange.classList.remove('.btn-outline-light');
        buttonChange.classList.add('.btn-outline-dark');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        buttonText.textContent = ' Light';
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        buttonChange.classList.remove('.btn-outline-dark');
        buttonChange.classList.add('.btn-outline-light');
    }

    bgDarkElements.forEach(function(element) {
        element.classList.toggle('bg-dark');
        element.classList.toggle('bg-light');
    });

    btnDarkElements.forEach(function(element) {
        element.classList.toggle('btn-outline-dark');
        element.classList.toggle('btn-outline-light');
    });

    textDarkElements.forEach(function(element) {
        element.classList.toggle('text-dark');
        element.classList.toggle('text-light');
    });

    bgLightElements.forEach(function(element) {
        element.classList.toggle('bg-light');
        element.classList.toggle('bg-dark');
    });

    btnLightElements.forEach(function(element) {
        element.classList.toggle('btn-outline-light');
        element.classList.toggle('btn-outline-dark');
    });

    textLightElements.forEach(function(element) {
        element.classList.toggle('text-light');
        element.classList.toggle('text-dark');
    });

});


let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let currentPlayer = 1;

function makeMove(row, col) {
    if (board[row][col] === 0) {
        gameModeSwitch.disabled = true;
        board[row][col] = currentPlayer;

        document.querySelector(`[onclick="makeMove(${row}, ${col})"]`).innerText = currentPlayer === 1 ? 'X' : 'O';
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        console.log(vsMachine)

        if (vsMachine === true) {
            if (!checkGameStatus() && currentPlayer === 2) {
                makeComputerMove();
            }
        } else {
            if (checkGameStatus()) {
                return;
            }
        }
    }
}

function makeComputerMove() {
    let emptyCells = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let randomCell = emptyCells[randomIndex];
        makeMove(randomCell.row, randomCell.col);
    }
}

function checkGameStatus() {
    if (checkWinner(1)) {
        announceWinner(1);
        return true;
    } else if (checkWinner(2)) {
        announceWinner(2);
        return true;
    }

    if (isBoardFull()) {
        announceDraw();
        return true;
    }

    return false;
}

function checkWinner(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
            return true;
        }
    }

    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true;
    }

    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true;
    }

    return false;
}


function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function announceWinner(player) {
    alert(`¡Jugador ${player} ha ganado!`);
    resetGame();
}

function announceDraw() {
    alert('¡Empate! No hay ganadores.');
    resetGame();
}

function resetGame() {
    gameModeSwitch.disabled = false;
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    currentPlayer = 1;

    document.querySelectorAll('.btn-table').forEach(button => {
        button.innerText = '';
    });

}