function DrawingUtility() {
    return {
        context: null,
        robotPos:null,
        canvas:null,
        grid:null,
        TR:null,
        init: function (robotPos,grid,TR,canvas) {
            if (canvas) {
                this.canvas = canvas;
            }
            if(robotPos){
                this.robotPos=robotPos;
            }
            if(grid){
                this.grid=grid;
            }
            if(TR){
                this.TR=TR;
            }
            this.initCanvas();
        },
        initCanvas:function(){
            this.robotPos.x=this.robotPos.y= 0;
            this.context = this.canvas.getContext("2d");
            this.context.fillStyle = 'yellow';
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'black';
        },
        drawBoard: function (noX,noY) {
            this.grid=[];
            var p = 0;
            for (var y = 0; y < noY; y++) {
                for (var x = 0; x < noX*this.TR; x += this.TR) {
                    this.drawRect(x, p);
                }
                p += this.TR;
            }
            this.drawRobot(this.robotPos.x, this.robotPos.y);
        },
        drawRect: function (x, y) {
            this.context.beginPath();
            this.context.rect(x, y, this.TR, this.TR);
            this.grid.push({x: x, y: y});
            this.context.fill();
            this.context.stroke();
        },
        drawRobot: function (x, y) {
            var self=this;
            this.robotPos.x=x;
            this.robotPos.y=y;
            var imageObj = new Image();
            imageObj.onload = function () {
                self.context.drawImage(imageObj, x, y, self.TR, self.TR);
            };
            imageObj.src = 'robot.png';
            utilities.displayToast("Drawing Robot at (" + x + "," + y + ")");
            console.log("Drawing Robot at (" + x + "," + y + ")");
        },
        drawTrash: function (x, y) {
            var self=this,TR=self.TR;
            if(self.robotPos.x==x&&self.robotPos.y==y)
             return;
            var imageObj = new Image();
            imageObj.onload = function () {
                self.context.drawImage(imageObj, x, y, self.TR, self.TR);
            };
            imageObj.src = 'trash.png';
            utilities.displayToast("Added Trash at (" + x / TR + "," + y / TR + ")");
            console.log("Added Trash at (" + x / TR + "," + y / TR + ")");
        },
        moveRobot: function (x, y) {
            var self=this;
            this.context.clearRect(self.robotPos.x, self.robotPos.y, this.TR, this.TR);
            this.context.fillStyle = 'green';
            this.drawRect(self.robotPos.x, self.robotPos.y);
            var imageObj = new Image();
            imageObj.onload = function () {
                self.context.drawImage(imageObj, x, y, self.TR, self.TR);
            };
            imageObj.src = 'robot.png';
            utilities.displayToast("Moved Robot to (" + x / self.TR + "," + y / self.TR + ")");
            console.log("Moved Robot to (" + x / self.TR + "," + y / self.TR + ")");
            self.robotPos.x = x;
            self.robotPos.y = y;
        },
        removeRobot:function(){
            this.context.clearRect(this.robotPos.x, this.robotPos.y, this.TR, this.TR);
        },
        clearCanvas:function(){
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        }
    };
}