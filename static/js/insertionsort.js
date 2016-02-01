// Insertion Sort //
(function() {
var n = 50

var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .domain(d3.range(n))
    .rangePoints([0, width]);
var y = d3.scale.ordinal()
    .domain(d3.range(n))
    .rangePoints([0, height]); 

var p = d3.select("#insertionsort")
    .on("click", click);
    
var svg = p.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

var gRects = svg.append("g")

function getX(d,i) { return x(i); }
function getY(d,i) { return height - y(d); }
function getH(d,i) { return y(d); }

function insertionsort(array) {
    var actions = [];
    for (var i = 0; i < array.length-1; ++i) {
        for (var j = i+1; j < array.length; ++j) {
            if (array[i] > array[j]) {
                var temp = array[i]
                array[i] = array[j]
                array[j] = temp
                actions.push({"0": i, "1": j})
            }
        }
    }
    return actions.reverse()
}
function click() {
    var array = d3.shuffle(d3.range(n))
        
    gRects.selectAll("rect")
        .data(array)
        .enter()
        .append("rect")
        .attr("x", getX)
        .attr("y", getY)
        .attr("height", getH)
        .attr("width", 10)
        .attr("fill", 'black')
        
    var swaps = insertionsort(array),
        rects = gRects.selectAll("rect")
    
    var transition = svg.transition()
      .duration(150)
      .each("start", function start() {
        var action = swaps.pop(),
            i = action[0],
            j = action[1],
            ri = rects[0][i],
            rj = rects[0][j];
        rects[0][i] = rj;
        rects[0][j] = ri;
        transition.each(function() { rects.transition().attr("x", getX).attr("y", getY).attr("height", getH); });
        if (swaps.length) transition = transition.transition().each("start", start);
      });
}

click();
p.append("button")
    .text("▶ Play");
})();
