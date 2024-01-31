let vsMachine = true;
const gameModeSwitch = document.getElementById('gameModeSwitch');
const audio = document.getElementById('click-sound');
const audioCelebration = document.getElementById('celebration-sound');
var confettiDiv = document.getElementById('confetti');

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
        canMakeMove = false;
        gameModeSwitch.disabled = true;
        audio.play();
        board[row][col] = currentPlayer;

        document.querySelector(`[onclick="makeMove(${row}, ${col})"]`).innerText = currentPlayer === 1 ? 'X' : 'O';
        currentPlayer = currentPlayer === 1 ? 2 : 1;

        if (vsMachine === true) {
            if (!checkGameStatus() && currentPlayer === 2) {
                setTimeout(function() {
                    makeComputerMove();
                }, 1750);
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
    audioCelebration.play();
    var confettiElement = createCanvas(confettiDiv);
    var confettiSettings = { target: confettiElement };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    setTimeout(function() {
        confetti.clear();
        confettiDiv.removeChild(confettiElement);
        alert(`¡Jugador ${player} ha ganado!`);
    }, 1250);
    audio.pause();
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

function createCanvas(parentElement) {
    var canvas = document.createElement("canvas");
  
    var windowWidth = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  
    var windowHeight = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  
    canvas.width = windowWidth;
    canvas.height = windowHeight;
  
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
  
    parentElement.appendChild(canvas);
  
    return canvas;
  }
  