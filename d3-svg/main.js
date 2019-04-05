let climate_daly_data = [
        {region: "Low-and-middle-income countries of the African Region", deaths: 57},
        {region: "Low-and-middle-income countries of the Americas", deaths: 2},
        {region: "Low-and-middle-income countries of the Eastern Mediterranean Region", deaths: 20},
         {region: "Low-and-middle-income countries of the European Region", deaths: 0.67},
         {region: "Low-and-middle-income countries of the South-East Asia Region", deaths: 58},
        {region: "Low-and-middle-income countries of the Western Pacific Region", deaths: 4},
        {region: "High income countries", deaths: 0.23}
 ];


let toggleClass = (i,toggle) => {
   d3.select("#viz div:nth-child("+ i +")").classed("highlightBar",toggle);
   d3.select("#legend li:nth-child("+ i +")").classed("highlightText",toggle);
};

let divSelection = d3.select("body").selectAll("div").selectAll("div")
let listSelection = d3.select("body").selectAll("ol").selectAll("li")

divSelection
	.data(climate_daly_data)
	.enter()
	.append("div")
	.attr("class", "bar")
	// .attr("bar", function(d, i){ return "element-"+i; })
	// .attr("bar", "elements")
	// .text("DIV TEST!")
	.style("width", function(d){ return d.deaths * 8 +"px"; })
	// .on("mouseover", function(d, i){return toggleClass(i, d3.select(this)) });
	// .on("click", function(d, i){
	// d3.select(this).text(d)
	// })
	.on("mouseover", function(d, i){
  	toggleClass(i+1, true)
  	// d3.select(this).classed("highlightBar", true)
	})
	.on("mouseout",function(d, i){
  	toggleClass(i+1, false)
  	// d3.select(this).classed("highlightBar", false)
	});

listSelection
	.data(climate_daly_data)
	.enter()
	.append("li")
	.text(function(d){ return d.region +": "+ d.deaths;})
	.on("mouseover", function(d, i){
  	toggleClass(i+1, true)
  	// d3.select(this).classed("highlightText", true)
	})
	.on("mouseout",function(d, i){
  	toggleClass(i+1, false)
  	// d3.select(this).classed("highlightText", false)
	});
