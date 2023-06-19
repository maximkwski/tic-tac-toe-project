// Factory function for creating players
const Player = (name, marker) => {
    return { name, marker };
};
  
// Module for game logic
const Game = (() => {
    // Game state
    let currentPlayer;
    let board;
    const players = [];
  
    // DOM elements
    const cells = document.querySelectorAll('.board > div');
  
    // Initialize the game
    const init = () => {
      // Create players
      const player1 = Player('Player 1', 'X');
      const player2 = Player('Player 2', 'O');
      players.push(player1, player2);
  
      currentPlayer = player1;
      board = ['', '', '', '', '', '', '', '', ''];
  
      // Attach event listeners to cells
      cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
          makeMove(index);
        });
      });
  
      updateDisplay();
    };
  
    // Make a move
    const makeMove = (index) => {
      if (board[index] === '') {
        board[index] = currentPlayer.marker;
        updateDisplay();
        checkWin();
        console.log(board);
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      }
    };
  
    // Update the display
    const updateDisplay = () => {
      cells.forEach((cell, index) => {
        cell.textContent = board[index];
      });
    };
  
    // Check for a win
    const checkWin = () => {
        updateDisplay();
      const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
      ];
      
  
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
          alert(`${currentPlayer.name} wins!`);
          resetGame();
          return;
        }
      }
  
      if (!board.includes('')) {
        alert('It\'s a tie!');
        resetGame();
      }
    };
  
    // Reset the game
    const resetGame = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      updateDisplay();
    };
  
    return { init };
})();
  
// Start the game
Game.init();
  
// function createBoard() {
//     for (let i = 0; i < 9; i++) {
//         let item = document.createElement('div');
//         item.innerHTML = gameBoard.gameArr[i];
//         item.classList.add('item');
//         gameboard.appendChild(item);
//     }
// }
// createBoard(); 
