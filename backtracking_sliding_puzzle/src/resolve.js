export function solve15puzzle(puzzle) {
    // get the dimensions of the puzzle
    let width = puzzle.length,
        height = puzzle[0].length;

    // check if the puzzle is a valid state
    if (!isValidState(puzzle)) return false;

    // define a direction lookup table
    let directions = {
        up: [1, 0],
        right: [0, 1],
        down: [-1, 0],
        left: [0, -1]
    };

    // define a lookup table containing the correct values 
    // for each cell of the puzzle
    let goal = new Array(width).fill(0).map((_, i) =>
        new Array(height).fill(0).map((_, j) => i * height + j + 1));
    goal[width - 1][height - 1] = 0;

    // define a recursively-defined function to find the solution
    function _solve(puzzle) {
        console.log('puzzle: ', JSON.parse(JSON.stringify(puzzle)));
        let [x, y] = findZeroPosition(puzzle);

        // if the puzzle is in solved state, return true
        if (isSolved(puzzle, goal)) {
            return true;
        }

        // iterate through the directions array
        for (let direction of Object.keys(directions)) {
            let [dx, dy] = directions[direction];
            let [a, b] = [x + dx, y + dy];

            // if the cell is out of bounds, ignore it
            if (!inBounds(a, b, width, height)) {
                continue;
            }

            // switch cells
            puzzle[x][y] = puzzle[a][b];
            puzzle[a][b] = 0;

            // recurse
            if (_solve(puzzle)) {
                return true;
            }

            // reset puzzle
            puzzle[a][b] = puzzle[x][y];
            puzzle[x][y] = 0;
        }
        return false;
    }

    // call the recursive function
    return _solve(puzzle);
}

// helper function to check if the puzzle is valid
function isValidState(puzzle) {
    let width = puzzle.length,
        height = puzzle[0].length;
    let i = 0;
    let values = new Set();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (puzzle[x][y] < 0 || puzzle[x][y] > width * height) return false;
            if (values.has(puzzle[x][y])) return false;
            values.add(puzzle[x][y]);
        }
    }
    return true;
}

// helper function to check if the puzzle is solved
function isSolved(puzzle, goal) {
    let width = puzzle.length,
        height = puzzle[0].length;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (puzzle[x][y] !== goal[x][y]) return false;
        }
    }
    return true;
}

// helper function to find position of 0 in the puzzle
function findZeroPosition(puzzle) {
    let width = puzzle.length,
        height = puzzle[0].length;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (puzzle[x][y] === 0) {
                return [x, y];
            }
        }
    }
    return false;
}

// helper function to check if cell is in bounds
function inBounds(x, y, width, height) {
    if (x < 0 || x >= width || y < 0 || y >= height) {
        return false;
    }
    return true;
}
