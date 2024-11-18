
const settings = {
    canvasWidth: window.innerWidth*0.9,
    canvasHeight: window.innerHeight*0.8,
    rows: 8,
    columns: 15,
    nodeWidth: window.innerWidth*0.9/15,
    nodeHeight: window.innerHeight*0.8/8,
    startNode:{
        row:0,
        col:0
    },
    speed: 5
    //nodeSize:Math.max((window.innerWidth*0.9/25),(window.innerHeight/15)),
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
let grid = Array(settings.rows).fill().map(()=>Array(settings.columns).fill());
//inititialize the grid by filling it with nodes and setting the start and end nodes
let startNode = null;
initializeGrid(settings.rows,settings.columns);


mazeBtn.addEventListener("click",()=>{
    const history = generateMaze(grid,startNode);
    
    animate(history)
    
});

solveMazeBtn.addEventListener('click',()=>{
    const visitedNodes = solveMaze(grid,startNode);
    const shortestPath = getShortestPath(visitedNodes[visitedNodes.length-1]);

    animateSolve(shortestPath);
})

//reseting the board, just calling initializeGrid to reset everything
const timeoutIds = [];

function reset(){
    timeoutIds.forEach(id=>clearTimeout(id))
    initializeGrid(settings.rows,settings.columns);
}

function initializeGrid  (rows,columns){
    ctx.clearRect(0,0,settings.canvasWidth,settings.canvasHeight);
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<columns;j++){
            let node = null;
            const {nodeWidth,nodeHeight} = settings; 
            if(i===settings.startNode.row && j === settings.startNode.col){
                
                node = new Node(i,j,nodeWidth,nodeHeight,true);
                startNode = node;
                grid[i][j] = node;
                
            }else{
                node = new Node(i,j,nodeWidth,nodeHeight);
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
        },(100*i)/settings.speed)
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

function setRows(value){
    settings.rows = +value;
    settings.nodeHeight = settings.canvasHeight/settings.rows,
    grid = Array(settings.rows).fill().map(()=>Array(settings.columns).fill());
    reset();
}

function setColumns(value){
    settings.columns = +value;
    settings.nodeWidth= settings.canvasWidth/settings.columns,
    grid = Array(settings.rows).fill().map(()=>Array(settings.columns).fill());
    reset();
}

function setSpeed(value){
    settings.speed = +value;
}