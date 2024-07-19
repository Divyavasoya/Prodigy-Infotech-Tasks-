const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    updateCell(cell, index);
    checkWinner();
};

const updateCell = (cell, index) => {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameBoard[winCondition[0]];
        const b = gameBoard[winCondition[1]];
        const c = gameBoard[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            highlightWinningCells(winCondition);
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        gameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
        return;
    }
};

const highlightWinningCells = (winCondition) => {
    winCondition.forEach(index => {
        cells[index].classList.add('win');
    });
};

const restartGame = () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `Player X's turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
