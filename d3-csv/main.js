// created a number of variables to hold the margin information,
// width, and height of the graph.
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,
  padding = 40;

// x- and y- scale
var xScale = d3.scaleLinear()
  .range([0, width]);
var yScale = d3.scaleLinear()
  .range([height, 0]);

// select svg
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// import data
d3.csv("data.csv")
  .then(function(data) {
    console.log(data);
    // Coerce the strings to numbers.
    data.forEach(function(d) {
      d.x = +d.x;
      d.y = +d.y;
    });

    // Compute the scales’ domains.
    xScale.domain(d3.extent(data, function(d) {
      return d.x;
    })).nice();

    yScale.domain(d3.extent(data, function(d) {
      return d.y;
    })).nice();

    // Add the x-axis.
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    // Add the y-axis.
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale));

    // Add the points!
    svg.selectAll(".point")
      .data(data)
      .enter().append("path")
      .attr("class", "point")
      .attr("d", d3.symbol().type(d3.symbolCircle))
      .attr("transform", function(d) {
        return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")";
      });
  });
