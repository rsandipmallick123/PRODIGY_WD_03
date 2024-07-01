
document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.getElementById('resetButton');
  const gameBoard = document.getElementById('gameBoard');
  let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];
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

  const handleCellPlayed = (clickedCell, clickedCellIndex) => {
      board[clickedCellIndex] = currentPlayer;
      clickedCell.innerHTML = currentPlayer;
  };

  const handlePlayerChange = () => {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  const handleResultValidation = () => {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
          const winCondition = winningConditions[i];
          let a = board[winCondition[0]];
          let b = board[winCondition[1]];
          let c = board[winCondition[2]];
          if (a === '' || b === '' || c === '') {
              continue;
          }
          if (a === b && b === c) {
              roundWon = true;
              break;
          }
      }

      if (roundWon) {
          alert(`Player ${currentPlayer} has won!`);
          gameActive = false;
          return;
      }

      let roundDraw = !board.includes('');
      if (roundDraw) {
          alert('Draw!');
          gameActive = false;
          return;
      }

      handlePlayerChange();
  };

  const handleCellClick = (e) => {
      const clickedCell = e.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

      if (board[clickedCellIndex] !== '' || !gameActive) {
          return;
      }

      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
  };

  const handleResetGame = () => {
      currentPlayer = 'X';
      board = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
  };

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', handleResetGame);
});
