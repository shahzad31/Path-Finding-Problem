var utilities = {
    TR:null,
    distance: function (pos0, pos1) {
        var d1 = Math.abs(pos1.x / 50 - pos0.x / 50);
        var d2 = Math.abs(pos1.y / 50 - pos0.y / 50);
        return d1 + d2;
    },
    contains: function (list, node) {
        for (var k = 0, l = list.length; k < l; k++) {
            if (this.equals(list[k], node)) {
                return true;
            }
        }
        return false;
    },
    getPath: function (pt1, pt2) {
        var path = [], x0 = pt1.x, y0 = pt1.y, x1 = pt2.x, y1 = pt2.y,TR=this.TR;

        while (true) {
            path.push({x: x0, y: y0});
            if (x0 === x1 && y0 === y1)
                break;
            if (x1 > x0) {
                x0 += TR;
            } else if (y1 > y0) {
                y0 += TR;
            } else if (x1 < x0) {
                x0 -= TR;
            } else if (y1 < y0) {
                y0 -= TR;
            }
        }
        return path;
    },
    getNeighbours: function (p1) {
        var list = [],TR=this.TR;
        if (p1.x - TR > 0) {
            list.push({x: p1.x - TR, y: p1.y});
        }
        if (p1.y - TR > 0) {
            list.push({x: p1.x, y: p1.y - TR});
        }

        if (p1.x + TR < 540) {
            list.push({x: p1.x + TR, y: p1.y});
        }

        if (p1.y + TR < 540) {
            list.push({x: p1.x, y: p1.y + TR});
        }
        return list;
    },
    equals: function (p1, p2) {
        return !!(p1.x == p2.x && p1.y == p2.y);
    },
    isPointInPoly: function (poly, pt) {
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
            && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (c = !c);
        return c;
    },
    findNearestPoly: function (x, y,grid) {
        var TR=this.TR;
        for (var i = 0; i < grid.length; i++) {
            var x2 = grid[i].x;
            var y2 = grid[i].y;
            var result = utilities.isPointInPoly([{x: x2, y: y2}, {x: x2 + TR, y: y2}, {x: x2 + TR, y: y2 + TR}, {
                x: x2,
                y: y2 + TR
            }], {x: x, y: y});
            if (result) {
                return {x: x2, y: y2};
            }
        }
    }
};