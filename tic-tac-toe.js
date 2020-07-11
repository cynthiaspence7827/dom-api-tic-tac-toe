window.addEventListener('DOMContentLoaded', () => {
    let player1Turn = true;
    let grid = ['', '', '', '', '', '', '', '', ''];
    let cell = document.getElementById('tic-tac-toe-board');
    const newGame = document.getElementById('new-game');
    const giveUp = document.getElementById('give-up');
    let gameOver = false;
    const winner = document.getElementById('game-status');

    const checkStatus = function () {
        let gameTied = true;
        for (let i = 0; i < grid.length; i += 3) {
            if (grid[i] !== '' && grid[i] === grid[i + 1] && grid[i] === grid[i + 2]) {
                gameOver = true;
                winner.innerHTML = 'Winner: ' + grid[i];
            }
            if (grid[i] !== '' && grid[i] === grid[i + 3] && grid[i] === grid[i + 6]) {
                gameOver = true;
                winner.innerHTML = 'Winner: ' + grid[i];
            }
        }
        if (grid[0] !== '' && grid[0] === grid[4] && grid[0] === grid[8]) {
            gameOver = true;
            winner.innerHTML = 'Winner: ' + grid[0];
        }
        if (grid[2] !== '' && grid[2] === grid[4] && grid[2] === grid[6]) {
            gameOver = true;
            winner.innerHTML = 'Winner: ' + grid[2];
        }
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === '') {
                gameTied = false;
            }
        }
        if (gameTied && !gameOver) {
            winner.innerHTML = 'Winner: None'
            gameOver = true;
        }

    };

    const markCell = function (event) {
        let myCell = event.target;
        let cellId = myCell.id;
        let cellNum = Number(cellId[cellId.length - 1]);
        if (!cellId.startsWith('square') || grid[cellNum] !== '') {
            return;
        }
        const moveImg = document.createElement('img');
        myCell.appendChild(moveImg);
        if (player1Turn && grid[cellNum] == '' && !gameOver) {
            moveImg.setAttribute('src', 'assets/player-x.svg');
            moveImg.setAttribute('alt', 'X');
            grid[cellNum] = 'X';
            player1Turn = false;
        } else if (!player1Turn && grid[cellNum] == '' && !gameOver) {
            moveImg.setAttribute('src', 'assets/player-o.svg');
            moveImg.setAttribute('alt', 'O');
            grid[cellNum] = 'O';
            player1Turn = true;
        }
        checkStatus();
        localStorage.addItem('gameState', JSON.stringify(grid));
        localStorage.addItem('turn', player1Turn);
        localStorage.addItem('status', gameOver);
    };

    const startNew = (event) => {
        player1Turn = true;
        grid = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        const cells = document.querySelectorAll('.square');
        cells.forEach((c) => {
            c.removeChild();
        });
        winner.innerHTML = '';
        event.target.disabled = true;
    };

    cell.addEventListener('click', markCell);
    newGame.addEventListener('click', startNew);

});
