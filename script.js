const gameBoard = (()=>{
    const gameArr = ["X", "X", "0", "X", "0", "0", "X", "X", "0"];

    return {
        gameArr
    };
})();

const Player = (sign) => {

    return {sign}
};

//DOM
const gameboard = document.querySelector('.gameboard');
console.log(gameboard);

function createBoard() {
    for (let i = 0; i < 9; i++) {
        let item = document.createElement('div');
        item.classList.add('item');
        gameboard.appendChild(item);
    }
}
createBoard(); //create the game board with 9 items

