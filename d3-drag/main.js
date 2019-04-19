var width = 1000;
var height = 500;
var range = 100;
var cntPoints = 50;
var padding = {
  x: 20,
  y: 20
};

// Generate the random dataset
var dataset = d3.range(cntPoints).map(function() {
  return [Math.random() * range, Math.random() * range, Math.random() * 5];
})

// var xScale = d3.scaleLinear()
//   .domain([0, range]).range([0, width - 20]);
// var yScale = d3.scaleLinear()
//   .domain([0, range]).range([height - padding.y, 0]);
var scaleColor = d3.scaleLinear()
  .domain([0, 5]).range(["blue", "yellow"]);

// Scale function
var xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {
    return d[0];
  })])
  .range([padding.x, width - padding.x]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {
    return d[1];
  })])
  // .range([padding, h-padding]);
  .range([height - padding.y, padding.y]);


// set up the x- and y- axis
var xAxis = d3.axisBottom().scale(xScale).ticks(5);
var yAxis = d3.axisLeft().scale(yScale).ticks(5);

svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('padding-top', padding.y)
  .style('padding-left', padding.x);

svg.append("clipPath")
  .attr("id", "chart-area")
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height - padding.y);

rect = svg
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'invisible')
  .on('click', function() {
    svg.selectAll('circle[fill="blue"]')
      .transition()
      .delay(function(d, i) {
        return i * 300;
      })
      .duration(1000)
      .attr('cx', function(d) {
        return scaleX(d[0]);
      })
      .attr('cy', function(d) {
        return scaleY(d[1]);
      })
      .attr('fill', function(d) {
        return scaleColor(d[2]);
      })

  });

// Generate the x- and y- axis
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (height - padding.x) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + padding.y + ", 0)")
  .call(yAxis);

// Drag and Drop the circles
circles = svg
  .append('g')
  .attr('id', 'main-container')
  .attr('clip-path', 'url(#chart-area)')
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('r', 14)
  .attr('cx', function(d) {
    return xScale(d[0]);
  })
  .attr('cy', function(d) {
    return yScale(d[1]);
  })
  .attr('fill', function(d) {
    return scaleColor(d[2]);
  })
  .attr("fill-opacity", 0.5)
  .attr("stroke-opacity", 0.8)
  .call(d3.drag()
    .on("start", started));
// .on("start", dragstarted)
// .on("drag", dragged)
// .on("end", dragended));

// Show the tooltips
circles
  .on('mouseover', function(d) {
    coordinates = d3.mouse(this);

    d3.select("#tooltip")
      .style("left", coordinates[0] + padding.x + "px")
      .style("top", coordinates[1] + padding.y + "px")
      .select("#info")
      .text(tooltipText(d));

    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function() {
    d3.select("#tooltip").classed("hidden", true);
  })

// Function to handle what happens when drag is started
function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

// Function to handle what happens when drag is in progress
function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

// Function to handle what happens when drag is ended
function dragended(d) {
  d3.select(this).classed("active", false);
}

function started() {
  var circle = d3.select(this).classed("dragging", true);

  d3.event.on("drag", dragged).on("end", ended);

  function dragged(d) {
    circle.raise().attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  }

  function ended() {
    circle.classed("dragging", false);
  }
}

// Return the color base, X and Y of the selected circle
function tooltipText(d) {
  return 'Color base: ' + Math.round(d[2] * 100) / 100 + ', Position: ' + Math.round(d[0] * 100) / 100 + ';' + Math.round(d[1] * 100) / 100;
}
