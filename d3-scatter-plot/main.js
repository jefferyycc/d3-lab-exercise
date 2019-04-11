//Step 1. set the width and height of the SVG
var w = 600;
var h = 400;
var padding = 40;

//Step 2. prepare the dataset (X_data vs Y_data)
// var dataset = [];
// dataset.push([50, 8]);
// dataset.push([100, 15]);
// dataset.push([220, 29]);
// dataset.push([380, 33]);
// dataset.push([480, 55]);
var dataset = [
  [50, 8],
  [100, 15],
  [220, 29],
  [380, 33],
  [480, 55]
];

//Step 3. scale function
var xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {
    return d[0];
  })])
  .range([padding, w - padding]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {
    return d[1];
  })])
  // .range([padding, h-padding]);
  .range([h - padding, padding]);

//Step 4. set up the x- and y- axis
var xAxis = d3.axisBottom().scale(xScale).ticks(5);
var yAxis = d3.axisLeft().scale(yScale).ticks(5);

//Step 5. create svg element
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

//Step 6. Call the x axis in a group tag
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

//Step 7. Call the y axis in a group tag
svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + padding + ", 0)")
  .call(yAxis);

//Step 8. appends a circle for each datapoint
svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return xScale(d[0]);
  })
  .attr("cy", function(d) {
    return yScale(d[1]);
    // return h - yScale(d[1]);
  })
  .attr("r", 5)
  .attr("fill", "blue");
