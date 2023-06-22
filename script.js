// Factory function for creating players
const Player = (name, marker, score) => {
    return { name, marker, score };
};


  
// Module for game logic
const Game = (() => {
    // Game state
    let currentPlayer;
    let board;
    let players = [];
  
    // DOM elements
    const cells = document.querySelectorAll('.board > div');
    let turnDisplay = document.querySelector('#players-turn > p');
    let scoreTab = document.querySelectorAll('.score > div');
    
 
  
    // Initialize the game
    const init = () => { 
      console.log(scoreTab);
      // Create players
      const player1val = document.getElementById('name1').value;
      const player2val = document.getElementById('name2').value;  

      const player1 = Player(player1val, 'X', 0);
      const player2 = Player(player2val, 'O', 0);
      players.push(player1, player2);
      
      currentPlayer = player1;
      board = ['', '', '', '', '', '', '', '', ''];
      scoreTab[0].innerHTML = player1.score;
      scoreTab[1].innerHTML = player1.score;
      
      
      // Attach event listeners to cells
      cells.forEach((cell, index) => {
          cell.addEventListener('click', () => {
          makeMove(index);
        });
      });
  
      updateDisplay();
      updateTurnDisplay();
    };
  
    // Make a move
    const makeMove = (index) => {
      if (board[index] === '') {
        board[index] = currentPlayer.marker;
        updateDisplay();
        
        checkWin();
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        updateTurnDisplay();
      }
    };
    
    //Update players turn  display
    const updateTurnDisplay = () => {
        turnDisplay.innerHTML = `It's ${currentPlayer.name}'s turn!`;
    }

    // Update the display
    const updateDisplay = () => {
      cells.forEach((cell, index) => {
        cell.textContent = board[index];
      });
    };

    const updateScore = () => {
        currentPlayer.score++;
        scoreTab[0].innerHTML = players[0].score;
        scoreTab[1].innerHTML = players[1].score;
        console.log(currentPlayer.score);
    };
  
    // Check for a win
    const checkWin = () => {
      const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
      ];
      
        let winningCells = null;

        for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
        winningCells = [a, b, c];
        break;
            }
        }


        if (winningCells) {
            updateDisplay();
            winningCells.forEach(position => {
            cells[position].classList.add('winning-cell');
            cells[position].innerHTML = board[position];
            });
            
            updateScore();
            alert(`${currentPlayer.name} wins!`);
            // resetGame();
            return;
        }
  
        if (!board.includes('')) {
        alert('It\'s a tie!');
        // resetGame();
        }
    };

    // Reset the game
    const resetGame = () => {
        // board = ['', '', '', '', '', '', '', '', ''];
        // document.getElementById('myForm').reset();
        // // currentPlayer = null;
        // players = [];
        // console.log(currentPlayer);
        // console.log(players);
        

        // updateDisplay();
        window.location.reload();
      };

  
    return { init, resetGame };
})();
  
// Start the game

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();


    Game.init();
});

document.getElementById('reset').addEventListener("click", () => {
    Game.resetGame();
})