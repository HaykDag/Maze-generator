
const settings = {
    canvasWidth: 800,
    canvasHeight:400,
    rows: 10,
    columns: 20,
    startNode:{
        row:0,
        col:0
    },
    nodeSize:40,
}

//get canvas , context, set width and heigth
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");
canvas.width = settings.canvasWidth;
canvas.height = settings.canvasHeight;

//get the buttons
const mazeBtn = document.getElementById("mazeBtn");
const solveMazeBtn = document.getElementById("solveMazeBtn");
const info = document.getElementById("info");
const resetBtn = document.getElementById("resetBtn");


//make 2D empty array by rows and cols
const grid = Array(settings.rows).fill().map(()=>Array(settings.columns).fill());
//inititialize the grid by filling it with nodes and setting the start and end nodes
let startNode = null;
initializeGrid(settings.rows,settings.columns);


mazeBtn.addEventListener("click",()=>{
    const history = generateMaze(grid,startNode,ctx);
    
    animate(history)
    
});

solveMazeBtn.addEventListener('click',()=>{
    const visitedNodes = solveMaze(grid,startNode);
    const shortestPath = getShortestPath(visitedNodes[visitedNodes.length-1]);

    animateSolve(shortestPath);
})

//reseting the board, just calling initializeGrid to reset everything
const timeoutIds = [];
resetBtn.addEventListener("click",()=>{
    timeoutIds.forEach(id=>clearTimeout(id))
    initializeGrid(settings.rows,settings.columns);
})



function initializeGrid  (rows,columns){
    ctx.clearRect(0,0,settings.canvasWidth,settings.canvasHeight)
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<columns;j++){
            let node = null;
            if(i===settings.startNode.row && j === settings.startNode.col){
                node = new Node(i,j,settings.nodeSize,true);
                startNode = node;
                grid[i][j] = node;
                
            }else{
                node = new Node(i,j,settings.nodeSize);
                grid[i][j] = node;
            }
            node.draw(ctx);
        }
    }
}
const animate = (history)=>{
    for(let i = 0;i<history.length;i++){
        
        const timeoutId = setTimeout(()=>{
            if(i>0) {
                history[i-1].isStartNode = false;
                history[i-1].draw(ctx)
            }
            history[i].isStartNode = true;
            history[i].draw(ctx);
        },5*i)
    timeoutIds.push(timeoutId)
    }
}

function getShortestPath (endPoint,path=[]){
    //base case
    if(endPoint===startNode || !endPoint) return path;
    //unshift adds elements to the start of the array
    //in the end the endPoint will be in the end 
    path.unshift(endPoint);
    //then we assingn endPoint to be the prev node of the endPoint
    endPoint = endPoint.prev;
    //and make out recursiv code
    return getShortestPath(endPoint,path)
}

const animateSolve = (shortestPath) => {
    for (let j = 0; j < shortestPath.length; j++) {
        startNode.isPath = true;
        startNode.draw(ctx)
        const timeoutId = setTimeout(() => {
            shortestPath[j].isPath = true;
            info.innerText = `Shortest path:${j+1}`;
            if(shortestPath[j+1]){
                if(shortestPath[j].row === shortestPath[j+1].row){
                    shortestPath[j].draw(ctx,j,"vertical");
                }else{
                    shortestPath[j].draw(ctx,j,"horizontal");
                }
            }else{
                shortestPath[j].draw(ctx,j,"vertical");
            }
        }, 50 * j);
        timeoutIds.push(timeoutId)
    }
};
