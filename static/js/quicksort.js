(function(){
var n = 75;

var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .domain(d3.range(n))
    .rangePoints([0, width]);
    
var y = d3.scale.ordinal()
    .domain(d3.range(n))
    .rangePoints([0, height]); 

var p = d3.select("#quicksort")
    .on("click", click);

var svg = d3.select("#quicksort")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

var gRects = svg.append("g");

function getX(d,i) { return x(i); }
function getY(d,i) { return height - y(d); }
function getH(d,i) { return y(d); }

function quicksort(array) {
    var actions = [];
    
    function swap(i,j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        actions.push({type: "swap", "0": i, "1": j})
    }
    
    function recurse(first,last) {
        if (first > last) {
            return;
        }
        else {
            actions.push({type: "changefocus", "f": first, "l": last, "pivot": array[last]});
            var ptr = first,
                pivot = array[last];
            for (var i = first; i < last; i++) {
                if (array[i] < pivot) {
                    swap(ptr,i);
                    ptr++;
                }
            }
            swap(last,ptr);
            recurse(first,ptr-1);
            recurse(ptr+1,last);
        }
    }
    
    recurse(0,array.length-1);
    return actions.reverse();
}

function click() {    
    var array = d3.shuffle(d3.range(n));
        
    gRects.selectAll("rect")
        .data(array)
        .enter()
        .append("rect")
        .attr("x", getX)
        .attr("y", getY)
        .attr("height", getH)
        .attr("width", 10)
        
    var actions = quicksort(array),
        rects = gRects.selectAll("rect")
                    .attr("fill", 'black');
    
    var transition = svg.transition()
      .duration(300)
      .each("start", function start() {
        var action = actions.pop();
        switch (action.type) {
            case "swap": {
                var i = action[0],
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
                break;
            }
            case "changefocus": {
                rects.attr("fill", function(d,i) {
                    if (d == action.pivot) { return "purple"; }
                    else if (action.f <= i && i < action.l) { return "black"; }
                    else { return "grey"; }
                });
                break;
            }
        }
        if (actions.length) transition = transition.transition().each("start", start);
        else transition.each("end", function() { rects.transition().attr("fill", "grey"); } );
      });
}

click();
p.append("button")
    .text("▶ Play");

})();