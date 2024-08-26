

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