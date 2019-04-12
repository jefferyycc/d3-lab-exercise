//Step 1. set the width and height of the SVG
var w = 600;
var h = 400;
var padding = 40;

// x- and y- scale
var xScale = d3.scaleLinear()
  .range([padding, w - padding]);
var yScale = d3.scaleLinear()
  .range([h - padding, padding]);

// import data
d3.csv("data.csv")
  .then(function(data) {
    console.log(data);
    console.log("import data sucessfully!");
    // Coerce the strings to numbers.
    data.forEach(function(d) {
      d.x = +d.x;
      d.y = +d.y;
    });

    //Step 3. scale function
    // Compute the scales’ domains.
    xScale.domain(d3.extent(data, function(d) {
      return d.x;
    })).nice();

    yScale.domain(d3.extent(data, function(d) {
      return d.y;
    })).nice();

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
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d.x);
        // return d.x;
      })
      .attr("cy", function(d) {
        return yScale(d.y);
      })
      .attr("r", 5)
      .attr("fill", "blue");
  })
  .catch(function(error) {
    // error handling
    console.log("Error when importing csv!");
  });
