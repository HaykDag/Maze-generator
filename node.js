class Node {
    constructor(row, col, size, isStartNode = false, isEndNode = false) {
        this.row = row;
        this.col = col;
        this.isStartNode = isStartNode;
        this.isEndNode = isEndNode;
        this.isVisited = false;
        this.isSolved = false;
        this.isPath = false;
        this.prev = null;
        this.size = size;
        this.distance = Infinity;
        //            top, right,bottom,left
        this.walls = [true, true, true, true]
    }

    draw(ctx,i=0,dir) {
        
        if(this.isVisited){
            ctx.beginPath();
            ctx.rect(this.col*this.size,this.row*this.size,this.size,this.size);
            ctx.fillStyle = 'black';
            ctx.fill();
        }
        if(this.isStartNode){
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.rect(this.col * this.size, this.row * this.size,this.size,this.size);
            ctx.fill();
        }
        //top
        if(this.walls[0]){
            ctx.beginPath();
            ctx.moveTo(this.col * this.size, this.row * this.size);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 4;
            ctx.lineTo(this.col * this.size+this.size,this.row * this.size);
            ctx.stroke();
        }
        //right
        if(this.walls[1]){
            ctx.beginPath();
            ctx.moveTo(this.col * this.size+this.size,this.row * this.size);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 4;
            ctx.lineTo(this.col * this.size+this.size,this.row * this.size+this.size);
            ctx.stroke();
        }
        //bottom
        if(this.walls[2]){
            ctx.beginPath();
            ctx.moveTo(this.col * this.size,this.row * this.size+this.size);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 4;
            ctx.lineTo(this.col * this.size+this.size,this.row * this.size+this.size);
            ctx.stroke();
        }
        //left
        if(this.walls[3]){
            ctx.beginPath();
            ctx.moveTo(this.col * this.size, this.row * this.size);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 4;
            ctx.lineTo(this.col * this.size,this.row * this.size+this.size);
            ctx.stroke();
        }
        if(this.isPath){
            ctx.beginPath();
            if(dir==="vertical"){
                ctx.rect(this.col*this.size+this.size*0.1,this.row*this.size+this.size*0.3,this.size*0.8,this.size*0.2);
            }else if(dir==="horizontal"){
                ctx.rect(this.col*this.size+this.size*0.3,this.row*this.size+this.size*0.15,this.size*0.2,this.size*0.6);
            }
            if(i%3===0){
                ctx.fillStyle = 'orange';
            }else if(i%2===0){
                ctx.fillStyle = 'green';
            }else{
                ctx.fillStyle = 'red';
            }
            ctx.fill();
        }
    }
}
