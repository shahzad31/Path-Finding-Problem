$(document).ready(function () {
    var grid = [];
    var path = [];
    var gridSize=6;
    var TR = 50;
    var robotPos = {x: 0, y: 0};
    var canvas= $("#myCanvas");
    var canvasObj = canvas[0];
    var gridSelect=$("#gridSelect");
    var algoSelect=$("#algoSelect");
    var button = $("#runSimulation");
    var drawing = new DrawingUtility();
    drawing.init(robotPos,grid,TR,canvasObj);
    utilities.TR=TR;
    drawing.drawBoard(6,6);
    var currAlgo="Greedy";
    var resetFlag=true;
    function getMousePos(evt) {
        var rect = canvasObj.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        return utilities.findNearestPoly(x, y, drawing.grid);
    }
    function drawImage(pt){
        if (pt && notAlreadyAdded(pt)) {

            path.push(pt);
            drawing.drawTrash(pt.x, pt.y);
        }
    }
    canvas.on('mousedown', function (evt) {
        var mousePos = getMousePos(evt);
            drawImage(mousePos);
    });
    button.on("click", function (evt) {
        $.ajax({
            method: "POST",
            url: "/getPath",
            headers: {
            'Content-Type':'application/json'
            },
            data:JSON.stringify({'path':path,'robotPos':robotPos,'algo':currAlgo})
        }).done(function( response ) {
                path=[];
                travelToPath(response);
        });
    });
    gridSelect.on("change",function(evt){
      var val=evt.target.value;
        drawing.clearCanvas();
        drawing.initCanvas();
        gridSize=+val;
        drawing.drawBoard(+val,+val);
        path=[];
    });
    algoSelect.on("change",function(evt){
         currAlgo=evt.target.value;
    });
    function reset(){
        drawing.clearCanvas();
        drawing.initCanvas();
        drawing.drawBoard(gridSize,gridSize);
        path=[];
    }
    function notAlreadyAdded(pt) {
        for (var i = 0, l = path.length; i < l; i++) {
            if (path[i].x == pt.x && path[i].y == pt.y) {
                return false;
            }
        }
        return true;
    }
    function travelToPath(tPath) {
        var l = tPath.length;
        var k = 0, j = 0;
        while (j < l) {
            setTimeout(function () {
                drawing.moveRobot(tPath[k].x, tPath[k].y);
                k++;
            }, j * 500);
            j++;
        }
    }

    $('#reset').on("click",reset);
});