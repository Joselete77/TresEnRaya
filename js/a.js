let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let currentPlayer = 1;

function makeMove(row, col) {
    if (board[row][col] === 0) {
        board[row][col] = currentPlayer;

        document.querySelector(`[onclick="makeMove(${row}, ${col})"]`).innerText = currentPlayer === 1 ? 'X' : 'O';

        if (checkGameStatus()) {
            return; // Juego terminado
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
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
