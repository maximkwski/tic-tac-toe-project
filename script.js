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
    const nextRoundBtn = document.querySelector('#next');
    let winningCells = null;
    
 
  
    // Initialize the game
    const init = () => { 
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
        if (board[index] === '' && turnDisplay.innerHTML === `It's ${currentPlayer.name}'s turn!`) {   
            board[index] = currentPlayer.marker;
            updateDisplay();
            
            
            checkWin();
            updateTurnDisplay();
        }
    };
    
    //Update players turn  display
    const updateTurnDisplay = () => {
        if (winningCells){
            turnDisplay.innerHTML = `${currentPlayer.name} wins!`;
        } else if (!board.includes('')){
            turnDisplay.innerHTML = `It's a tie!`
            cells.forEach(cell => {
                cell.classList.add('tie-cell');
            });
            nextRound();
        } else {
            turnDisplay.innerHTML = `It's ${currentPlayer.name}'s turn!`;
        }
    };

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
    };
  
    // Check for a win
    const checkWin = () => {
      const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
      ];
      
        
        

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
            nextRound();
            return;
        }
        
        //next player turn
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        
    }

    //const clearBoard for next round 
    const nextRound = () => {
        nextRoundBtn.addEventListener('click', () => {
            board = ['', '', '', '', '', '', '', '', ''];
            updateDisplay();
            if (winningCells) {
                winningCells.forEach(position => {
                    cells[position].classList.remove('winning-cell');
                });
            }

            if  (turnDisplay.innerHTML === `It's a tie!`) {
                cells.forEach(cell => {
                    cell.classList.remove('tie-cell');
                });
            }
            
            turnDisplay.innerHTML = `It's ${currentPlayer.name}'s turn!`;
            winningCells = null;

            console.log(currentPlayer);
        });
    };


    // Reset the game
    const resetGame = () => {
        window.location.reload();
      };

  
    return { init, resetGame };
})();
  
// Start the game



document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();


    Game.init();
    document.getElementById('start').style.display = "none";
});

//reset the game

document.getElementById('reset').addEventListener("click", () => {
    Game.resetGame();
});