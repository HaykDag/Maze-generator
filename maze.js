
function generateMaze (grid,start){
    const visitedNodes = [];
    const history = [];
    let unvistedNode = getAllNodes(grid);
    let current = start;

    while(unvistedNode.length>0){
    
        const neighbors = [];
        const row = current.row;
        const col = current.col;

        //top neighbor
        if(grid[row][col-1] && !grid[row][col-1].isVisited) neighbors.push(grid[row][col-1])
        //right neighbor
        if(grid[row+1] && !grid[row+1][col].isVisited) neighbors.push(grid[row+1][col])
        //bottom neighbor
        if(grid[row][col+1] && !grid[row][col+1].isVisited) neighbors.push(grid[row][col+1])
        //left neighbor
        if(grid[row-1] && !grid[row-1][col].isVisited) neighbors.push(grid[row-1][col])

        //backtrack
        
        if(neighbors.length === 0){
            if(visitedNodes.length===0) return history;
            current.isStartNode = false;
            history.push(current)
            
            current = visitedNodes.pop();
            current.isStartNode = true;
            history.push(current)
            
        }else if(current){

            let choise = randomChoise(neighbors.length);
            let next = neighbors[choise];
            
            removeWalls(current,next);

            current.isVisited = true;

            unvistedNode.shift();
            current.isStartNode = false;
            current.isVisited = true;
            visitedNodes.push(current);
            history.push(current)
           
            current = next;
            current.isStartNode = true;
            current.isVisited = true;
            history.push(current)
            
        }
    }
    
    return history;
}

function randomChoise(max){
    return Math.floor(Math.random()*max);
}

function removeWalls(current,neighbor){
    
    if(current===neighbor) return;
    if(current.row === neighbor.row){
        //left neighbor
        if(current.col - neighbor.col === 1){
            current.walls[3] = false;
            neighbor.walls[1] = false;
            //right neighbor
        }else if(current.col - neighbor.col === -1){
            current.walls[1] = false;
            neighbor.walls[3] = false;
        }
    }else if(current.col === neighbor.col){
        //top neighbor
        if(current.row - neighbor.row === 1){
            current.walls[0] = false;
            neighbor.walls[2] = false;
            //bottom neighbor
        }else if(current.row - neighbor.row === -1){
            current.walls[2] = false;
            neighbor.walls[0] = false;
        }
    }
}

function getAllNodes(grid){
    const result = [];
    for(let i = 0;i<grid.length;i++){
        for(let j = 0;j<grid[i].length;j++){
            result.push(grid[i][j])
        }
    }
    return result;
}