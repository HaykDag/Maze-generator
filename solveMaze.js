function solveMaze (grid){
    if(grid.length === 0) return;
    const END_COL = grid[0].length-1;
    const END_ROW = grid.length-1;

    const unvistedNodes = getNodes(grid);
    const visitedNodes = [];
    let start = grid[0][0];
    start.distance = 0;
    while(unvistedNodes.length > 0){
        unvistedNodes.sort((a,b)=>a.distance-b.distance);
        current = unvistedNodes.shift();
        
        if(current.distance === Infinity) return visitedNodes;
        
        current.isSolved = true;

        visitedNodes.push(current);
        if(current.row === END_ROW && current.col === END_COL){
            return visitedNodes;
        }

        const neighbors = getNeighbors(current);

        for(let neighbor of neighbors){
            neighbor.prev = current;
            neighbor.distance = current.distance + 1;
        }
    }
    return visitedNodes;
}

function getNeighbors(current){
    const result = [];
    const row = current.row;
    const col = current.col;
    //top neighbor
    if(grid[row-1] && !current.walls[0] && !grid[row-1][col].isSolved) result.push(grid[row-1][col]);
    //right neighbor
    if(grid[row][col+1] && !current.walls[1] && !grid[row][col+1].isSolved) result.push(grid[row][col+1]);
    //bottom neighbor
    if(grid[row+1] && !current.walls[2] && !grid[row+1][col].isSolved) result.push(grid[row+1][col]);
    //left neighbor
    if(grid[row][col-1] && !current.walls[3] && !grid[row][col-1].isSolved) result.push(grid[row][col-1]);

    return result;
}

function getNodes(grid){
    const result = [];
    for(let i = 0;i<grid.length;i++){
        for(let j = 0;j<grid[i].length;j++){
            result.push(grid[i][j])
        }
    }
    return result;
}