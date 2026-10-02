const outsideGrid = (coordinate, maxCoordinate) => {
    return coordinate < 0 || coordinate >= maxCoordinate
}

const getNumberOfAliveSurrondingCells = (row, column, grid) => {
    let alives = 0;
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
            if (columnOffset === 0 && rowOffset === 0) {
                continue;
            }

            const currentRow = rowOffset + row;
            const currentColumn = columnOffset + column;

            if (outsideGrid(currentRow, grid.length)) {
                continue;
            }
            if (outsideGrid(currentColumn, grid[0].length)) {

                continue;
            }

            if (grid[currentRow][currentColumn]) alives++;
        }
    }
    return alives;
};

export const run = (grid) => {
    return grid.map((row, rowNumber, fullGrid) => {
        return row.map((cell, columnNumber) => {
            const alives = getNumberOfAliveSurrondingCells(
                rowNumber,
                columnNumber,
                fullGrid
            );

            if (cell) {
                if (alives < 2) return false;
                if ([3, 4].includes(alives)) return true;
                if (alives > 3) return false;
            } else {
                if (alives === 3) return true;
                return false;
            }
        });
    });
};

export const randomGrid = (grid) => {
    return grid.map((row) => {
        return row.map(() => {
            return Math.round(Math.random());
        });
    });
};

