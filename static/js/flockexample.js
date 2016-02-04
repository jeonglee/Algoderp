var COLOR, boids, i, layout, sprites;

COLOR = d3.scale.category10();

boids = boids = (function() {
  var j, results;
  results = [];
  for (i = j = 0; j <= 200; i = ++j) {
    results.push({
      weight: Math.pow(Math.random() * 0.6, 2) + 0.8
    });
  }
  return results;
})();

var svg;

if (d3.select('#index-flocking-animation').empty()) {
  svg = d3.select('#flocking-animation').append('svg')
    .attr("width", '100%')
    .attr("height", 500)
}
else {
  svg = d3.select('#index-flocking-animation').append('svg')
    .attr("width", 800)
    .attr("height", 150)
}
    
sprites = svg.selectAll('.boid').data(boids);

sprites.enter()
        .append('svg:polygon')
        .classed('boid', true)
        .attr('r', 2)
        .attr('fill', function(d, i) {
            return COLOR(i);
        })
        .attr('points', function(d) {
            return "0,0 -" + (12 * d.weight) + "," + (4 * d.weight) + " -" + (12 * d.weight) + ",-" + (4 * d.weight);
        });


boids.push({
  im_a_mouse: true,
  weight: 10
});

layout = d3.layout.flock().size([window.innerWidth, window.innerHeight]).nodes(boids);

layout.start().on('tick', function() {
  return sprites.attr('transform', function(d) {
    return ("translate(" + d.location.x + ", " + d.location.y + ")") + ("rotate(" + (Math.atan2(d.velocity.y, d.velocity.x) * 180 / Math.PI) + ")");
  });
});

window.onresize = function() {
  return layout.size([window.innerWidth, window.innerHeight]);
};

window.onmousemove = function(e) {
  boids[501].location.x = e.x;
  return boids[501].location.y = e.y;
};