// Bubble Sort //
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

var p = d3.select("#bubblesort")
    .on("click", click);

var svg = d3.select("#bubblesort")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

var gRects = svg.append("g")

function getX(d,i) { return x(i); }
function getY(d,i) { return height - y(d); }
function getH(d,i) { return y(d); }

function bubblesort(array) {
    var actions = [],
        count = n,
        temp;
    
    while (count > 0) {
        for (var i = 0; i < array.length-1; ++i) {
            if (array[i] > array[i+1]) {
                temp = array[i]
                array[i] = array[i+1]
                array[i+1] = temp
                actions.push({"0": i, "1": i+1})
            }
        }
        count--;
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
        
    var swaps = bubblesort(array),
        rects = gRects.selectAll("rect")
                      .attr("fill", 'black');
        
    var transition = svg.transition()
      .duration(100)
      .each("start", function start() {
        var action = swaps.pop(),
            i = action[0],
            j = action[1],
            ri = rects[0][i],
            rj = rects[0][j];
        rects[0][i] = rj;
        rects[0][j] = ri;
        transition.each(function() { 
            rects.transition()
                .attr("x", getX)
                .attr("y", getY)
                .attr("height", getH)
        });
        if (swaps.length) transition = transition.transition().each("start", start);
        else transition.each("end", function() { rects.transition().attr("fill", "grey"); } );
      });
}

click();
p.append("button")
    .text("▶ Play");

})();