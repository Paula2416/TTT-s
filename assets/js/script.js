document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let userPlayer ='X';// the computer is the opposite player
    let computerPlayer = 'O';// controls the game when on going 
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const playerXImage = 'assets/images/X.png'; // Path to X image
    const playerOImage = 'assets/images/O.png'; // Path to O image

       // Possible winning combinations
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

       // Messages for the outcomes when playing 
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `It's a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

        

    // Function to handle cell click events when playing
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(board.children).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.style.backgroundImage = `url(${currentPlayer === 'X' ? playerXImage : playerOImage})`;

    checkResult();
     // If the game is still active and it's the computer's turn, make a move
     if (gameActive && currentPlayer === computerPlayer) {
        setTimeout(makeComputerMove, 400); // Small delay for a more natural feel
    }
}
    // Function to check if the game is won, drawn, or should continue
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
        alert(winningMessage()); // alert for win game
        gameActive = false;
        return;
    }

    
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        alert(drawMessage()); // alert for draw game
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = currentPlayerTurn();
}

    // Function to reset the game
function resetGame() {
    gameActive = true;
    currentPlayer = userPlayer; // change to users turn reset
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = currentPlayerTurn();
    Array.from(board.children).forEach(cell => {
        cell.style.backgroundImage = '';
    });

    if (currentPlayer === computerPlayer) {
        makeComputerMove(); // If the computer starts user makes the first move
    }
}
// Function for the computer to make a move
function makeComputerMove() {
    let availableCells = gameState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    gameState[randomIndex] = computerPlayer;
    board.children[randomIndex].style.backgroundImage = `url(${computerPlayer === 'X' ? playerXImage : playerOImage})`;

    checkResult();
}

    // Function to create the game board
function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}
 // for assigning players and start the game
 function setupGame() {
    userPlayer = prompt("Do you want to be X or O?").toUpperCase();
    computerPlayer = userPlayer === 'X' ? 'O' : 'X';
    currentPlayer = userPlayer;
    createBoard();
    resetGame();
}

resetButton.addEventListener('click', resetGame);
createBoard();
});
