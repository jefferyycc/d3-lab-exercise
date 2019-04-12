var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
  .range([0, width]);

var y = d3.scaleLinear()
  .range([height, 0]);

var r = d3.scaleSqrt()
  .range([2, 10]);

var xAxis = d3.axisBottom()
  .scale(x);

var yAxis = d3.axisLeft()
  .scale(y);

var color = d3.scaleOrdinal(d3.schemeCategory10);
var symbols = d3.scaleOrdinal(d3.symbols);

// creates a generator for symbols
var symbol = d3.symbol().size(100);

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv('data.csv')
  .then(function(data) {
    data.forEach(function(d) {
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
    });

    x.domain(d3.extent(data, function(d) {
      return d.sepal_length;
    })).nice();

    y.domain(d3.extent(data, function(d) {
      return d.sepal_width;
    })).nice();

    r.domain(d3.extent(data, function(d) {
      return d.petal_length;
    })).nice();

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'x axis')
      .call(xAxis);

    svg.append('g')
      .attr('transform', 'translate(0,0)')
      .attr('class', 'y axis')
      .call(yAxis);

    svg.append('text')
      .attr('x', 10)
      .attr('y', 10)
      .attr('class', 'label')
      .text('Sepal Width');

    svg.append('text')
      .attr('x', width)
      .attr('y', height - 10)
      .attr('text-anchor', 'end')
      .attr('class', 'label')
      .text('Sepal Length');

    // we use the ordinal scale symbols to generate symbols
    // such as d3.symbolCross, etc..
    // -> symbol.type(d3.symbolCross)()
    svg.selectAll(".symbol")
      .data(data)
      .enter().append("path")
      .attr("class", "symbol")
      .attr("d", function(d, i) {
        return symbol.type(symbols(d.species))();
      })
      .style("fill", function(d) {
        return color(d.species);
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.sepal_length) + "," + y(d.sepal_width) + ")";
      });

    var clicked = ""

    var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("path")
      .style("fill", function(d) {
        return color(d);
      })
      .attr("d", function(d, i) {
        return symbol.type(symbols(d))();
      })
      .attr("transform", function(d, i) {
        return "translate(" + (width - 10) + "," + 10 + ")";
      })
      .on("click", function(d) {
        d3.selectAll(".symbol").style("opacity", 1)

        if (clicked !== d) {
          d3.selectAll(".symbol")
            .filter(function(e) {
              return e.species !== d;
            })
            .style("opacity", 0.1)
          clicked = d
        } else {
          clicked = ""
        }
      });

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
        return d;
      });

    var buttons = d3.select('body').select('div').selectAll('button')
      .data(color.domain())
      .enter().append("button")
      .attr("class", "click-button")
      .text(function(d) {
        return d;
      })
      .on("click", function(d) {
        d3.selectAll(".symbol")
        .style("opacity", 0.1)
        // .style("opacity", 1)

        if (clicked !== d) {
          d3.selectAll(".symbol")
            .filter(function(e) {
              return e.species === d;
              // return e.species !== d;
            })
            .transition().delay(function(d, i) {  //animation
              return i * 10;
            })
            .style("opacity", 1)
            // .style("opacity", 0.1)
          clicked = d
        } else {
          clicked = ""
        }
      });

  })
  .catch(function(error) {
    // error handling
    console.log("Can't import the file!")
  });
