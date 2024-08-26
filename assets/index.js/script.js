document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const playerXImage = 'assets/images/playx.jpeg'; // Path to X image
    const playerOImage = 'assets/images/playo.jpeg'; // Path to O image

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

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `It's a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

        

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(board.children).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.style.backgroundImage = `url(${currentPlayer === 'X' ? playerXImage : playerOImage})`;

    checkResult();
}
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = winningMessage();
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.textContent = drawMessage();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = currentPlayerTurn();
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = currentPlayerTurn();
    Array.from(board.children).forEach(cell => {
        cell.style.backgroundImage = '';
    });
}

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

resetButton.addEventListener('click', resetGame);
createBoard();
});
