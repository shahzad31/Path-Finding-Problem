$(document).ready(function () {
    var grid = [];
    var path = [{x: 0, y: 0}];
    var finalPath = [];
    var TR = 50;
    var robotPos = {x: 0, y: 0};
    var canvas = $("#myCanvas");
    var context = canvas[0].getContext("2d");
    context.fillStyle = 'yellow';
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    var drawing = new DrawingUtility();
    drawing.init(context,robotPos,grid,TR);
    utilities.TR=TR;
    var button = $("#runSimulation");
    drawing.drawBoard();
    function getMousePos(canvas, evt) {
        var rect = canvas[0].getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        var pt = utilities.findNearestPoly(x, y, grid);
        if (pt && notAlreadyAdded(pt)) {

            path.push(pt);
            drawing.drawTrash(pt.x, pt.y);
        }
    }

    canvas[0].addEventListener('mousedown', function (evt) {
        var mousePos = getMousePos(canvas, evt);
    }, false);
    button.on("click", function (evt) {
        $.ajax({
            method: "POST",
            url: "/getPath",
            headers: {
            'Content-Type':'application/json'
            },
            data:JSON.stringify({'path':path,'robotPos':robotPos}) 
        }).done(function( response ) {
                travelToPath(response);
        });
    });
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
});