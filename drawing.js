function DrawingUtility() {
    return {
        context: null,
        robotPos:null,
        grid:null,
        TR:null,
        init: function (context,robotPos,grid,TR) {
            if (context) {
                this.context = context;
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
        },
        drawBoard: function () {
            var p = 0;
            for (var y = 0; y < 6; y++) {
                for (var x = 0; x < 300; x += this.TR) {
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
            var imageObj = new Image();
            imageObj.onload = function () {
                self.context.drawImage(imageObj, x, y, self.TR, self.TR);
            };
            imageObj.src = 'robot.png';
            console.log("Drawing Robot at (" + x + "," + y + ")");
        },
        drawTrash: function (x, y) {
            var self=this,TR=self.TR;
            var imageObj = new Image();
            imageObj.onload = function () {
                self.context.drawImage(imageObj, x, y, self.TR, self.TR);
            };
            imageObj.src = 'trash.png';
            console.log("Added Trash at (" + x / TR + "," + y / TR + ")");
        },
        moveRobot: function (x, y) {
            var self=this;
            this.context.clearRect(self.robotPos.x, self.robotPos.y, this.TR, this.TR);
            this.drawRect(self.robotPos.x, self.robotPos.y);
            var imageObj = new Image();
            imageObj.onload = function () {
                self.context.drawImage(imageObj, x, y, self.TR, self.TR);
            };
            imageObj.src = 'robot.png';
            console.log("Moved Robot to (" + x / self.TR + "," + y / self.TR + ")");
            self.robotPos.x = x;
            self.robotPos.y = y;
        }
    };
}