var margin = {
    top: 20,
    right: 0,
    bottom: 50,
    left: 85
  },
  svg_dx = 500,
  svg_dy = 400,
  plot_dx = svg_dx - margin.right - margin.left,
  plot_dy = svg_dy - margin.top - margin.bottom;

var xScale = d3.scaleLinear()
  .range([margin.left, plot_dx]);

var yScale = d3.scaleLinear()
  .range([plot_dy, margin.top]);

var formatIncome = d3.format("$,"),
  formatHsGrad = d3.format(".1%"),
  formatHsGradAxis = d3.format(".0%");

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", svg_dx)
  .attr("height", svg_dy);

// d3.csv("data.csv", d => {
d3.csv("data.csv")
  .then(function(data) {

    // update scale domain
    xScale.domain(d3.extent(data, function(d) {
      return d.income;
    })).nice();

    yScale.domain(d3.extent(data, function(d) {
      return d.hs_grad;
    })).nice();

    // plot the x- and y- axis
    var axis_x = d3.axisBottom(xScale).tickFormat(formatIncome);
    var axis_y = d3.axisLeft(yScale).tickFormat(formatHsGradAxis);

    svg.append("g")
      .attr("id", "axis_x")
      .attr("transform", "translate(0," + (plot_dy + margin.bottom / 2) + ")")
      .call(axis_x);

    svg.append("g")
      .attr("id", "axis_y")
      .attr("transform", "translate(" + (margin.left / 2) + ", 0)")
      .call(axis_y);

    d3.select("#axis_x")
      .append("text")
      .attr("transform", "translate(360, -10)")
      .text("Per capita income (1974)");

    d3.select("#axis_y")
      .append("text")
      .attr("transform", "rotate(-90) translate(-20, 15)")
      .text("High-school graduates (1970)");

    // plot the circles
    var circles = svg.append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      // .attr("cx", (d) => x(+d.income))
      // .attr("cy", (d) => y(+d.hs_grad))
      .attr("cx", function(d) {
        return xScale(d.income);
      })
      .attr("cy", function(d) {
        return yScale(d.hs_grad);
      })
      .attr("class", "non_brushed");

    // function highlightBrushedCircles() {
    //   if (d3.event.selection != null) {
    //     // revert circles to initial style
    //     circles.attr("class", "non_brushed");
    //     var brush_coords = d3.brushSelection(this);
    //
    //     // find the coords of all brushed circles and style these brushed circles
    //     circles.filter(function() {
    //         var cx = d3.select(this).attr("cx"),
    //           cy = d3.select(this).attr("cy");
    //         return isBrushed(brush_coords, cx, cy);
    //       })
    //       .attr("class", "brushed");
    //   }
    // }

    // brush action
    var brush = d3.brush()
      .on("brush", function(d) {
        // var brush_coords = d3.brushSelection(this);
        let coords = d3.event.selection;
        circles.attr("class", function() {
          let cx = d3.select(this).attr("cx"), cy = d3.select(this).attr("cy")
          let brushed = isBrushed(coords, cx, cy);
          return brushed ? "brushed" : "non_brushed"
        })
      });

    // create the brush object
    svg.append("g")
      .call(brush);
  });

function isBrushed(brush_coords, cx, cy) {
  var x0 = brush_coords[0][0],
    x1 = brush_coords[1][0],
    y0 = brush_coords[0][1],
    y1 = brush_coords[1][1];

  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}
