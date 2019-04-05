let edu_income_data = [
        {degree: "Doctoral degree", income: 1623},
        {degree: "Professional degree", income: 1730},
        {degree: "Master's degree", income: 1341},
         {degree: "Bachelor's degree", income: 1137},
         {degree: "Associate's degree", income: 798},
        {degree: "Some college, no degree", income: 738},
        {degree: "High school diploma", income: 678},
        {degree: "Less than a high school diploma", income: 493}
 ];


let toggleClass = (i,toggle) => {
   d3.select("#viz div:nth-child("+ i +")").classed("highlightBar",toggle);
   d3.select("#legend li:nth-child("+ i +")").classed("highlightText",toggle);
};

let divSelection = d3.select("body").selectAll("div").selectAll("div")
let listSelection = d3.select("body").selectAll("ol").selectAll("li")

divSelection
	.data(edu_income_data)
	.enter()
	.append("div")
	.attr("class", "bar")
	// .attr("bar", function(d, i){ return "element-"+i; })
	// .attr("bar", "elements")
	// .text("DIV TEST!")
	.style("width", function(d){ return d.income / 2 +"px"; })
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
	.data(edu_income_data)
	.enter()
	.append("li")
	.text(function(d){ return d.degree +": "+ d.income;})
	.on("mouseover", function(d, i){
  	toggleClass(i+1, true)
  	// d3.select(this).classed("highlightText", true)
	})
	.on("mouseout",function(d, i){
  	toggleClass(i+1, false)
  	// d3.select(this).classed("highlightText", false)
	});
