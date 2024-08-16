document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('sudoku-grid');

    // Create a 9x9 grid of input fields
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('min', '1');
        input.setAttribute('max', '9');
        gridContainer.appendChild(input);
    }
});

function isSafe(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] == num || grid[x][col] == num ||
            grid[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] == num) {
            return false;
        }
    }
    return true;
}

function solveSudokuUtil(grid, row, col) {
    if (row === 9) return true;
    if (col === 9) return solveSudokuUtil(grid, row + 1, 0);
    if (grid[row][col] !== 0) return solveSudokuUtil(grid, row, col + 1);

    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudokuUtil(grid, row, col + 1)) return true;
            grid[row][col] = 0;
        }
    }
    return false;
}

function solveSudoku() {
    let grid = [];
    const inputs = document.querySelectorAll('#sudoku-grid input');
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
            const value = inputs[i * 9 + j].value;
            grid[i][j] = value ? parseInt(value) : 0;
        }
    }
    if (solveSudokuUtil(grid, 0, 0)) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                inputs[i * 9 + j].value = grid[i][j];
            }
        }
    } else {
        alert('No solution exists');
    }
}
