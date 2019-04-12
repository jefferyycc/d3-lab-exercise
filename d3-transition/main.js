d3.csv("coffee.csv")
  .then(function(data) {
    console.log(data);

    //Width and height
    var w = 180;
    var h = 180;

    //Create SVG element
    var svg = d3.select("body").select("#main")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("style", "outline: thin solid black;");

    // Craete the circle element
    var circle = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return d.rats2015;
      })
      .attr("cy", function(d) {
        return d.coffee2015;
      })
      .attr("r", 5)
      .style("fill", "blue");

    // Listen to the click event and make transition
    d3.select("#start").on("click", function() {
      circle
        .transition()
        .delay(500)
        .duration(2500)
        .ease(d3.easeBounce)
        .attr("cx", function(d) {
          return d.rats2016;
        })
        .attr("cy", function(d) {
          return d.coffee2016;
        })
        .style("fill", "red");
    });

    d3.select("#reset").on("click", function() {
      circle
        .transition()
        .attr("cx", function(d) {
          return d.rats2015;
        })
        .attr("cy", function(d) {
          return d.coffee2015;
        })
        .style("fill", "blue");
    });

  });
