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

var dataset2 = [
  [60, 63],
  [23, 48],
  [547, 3],
  [94, 99],
  [243, 45]
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

// On click, update with new data
d3.select("h4")
  .on("click", function() {
    var numValues = dataset.length; // Get original dataset's length
    var maxRange = Math.random() * 1000; // Get max range of new values
    // dataset = []; // Initialize empty array
    // for (var i = 0; i < numValues; i++) {
    //   var newNumber1 = Math.floor(Math.random() * maxRange); // Random int for x
    //   var newNumber2 = Math.floor(Math.random() * maxRange); // Random int for y
    //   dataset.push([newNumber1, newNumber2]); // Add new numbers to array
    // }
    dataset = dataset2;

    // Update scale domains
    xScale.domain([0, d3.max(dataset, function(d) {
      return d[0];
    })]);
    yScale.domain([0, d3.max(dataset, function(d) {
      return d[1];
    })]);

    // Update circles
    svg.selectAll("circle")
      .data(dataset2) // Update with new data
      .transition() // Transition from old to new
      .duration(1000) // Length of animation
      .each(function() { // Start animation
        d3.select(this) // 'this' means the current element
          .attr("fill", "red") // Change color
          .attr("r", 8); // Change size
      })
      .delay(function(d, i) {
        return i / dataset.length * 500; // Dynamic delay (i.e. each item delays a little longer)
      })
      //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
      .attr("cx", function(d) {
        return xScale(d[0]); // Circle's X
      })
      .attr("cy", function(d) {
        return yScale(d[1]); // Circle's Y
      })
      .each(function() { // End animation
        d3.select(this) // 'this' means the current element
          .transition()
          .duration(500)
          .attr("fill", "blue") // Change color
          .attr("r", 5); // Change radius
      });

    // Update X Axis
    svg.select("x axis")
      .transition()
      .duration(1000)
      .call(xAxis);

    // Update Y Axis
    svg.select("y axis")
      .transition()
      .duration(100)
      .call(yAxis);
  });
