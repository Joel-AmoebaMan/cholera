//FIRST SOME VARIABLES/FUNCTIONS WE WILL NEED:
var h = 700;
var w = 800;
var Xscale = d3.scaleLinear().domain([0,20]).range([0,500]);
var Yscale = d3.scaleLinear().domain([0,20]).range([0,500]);

//CREATE MAIN SVG ELEMENT
const svg = d3.select("body").append("svg").attr('width', w).attr('height', h).style('background-color', 'darkGray');

//DRAW THE MAP

d3.json("streets.json", function (data) {
  console.log(data);
});

//DRAW THE DEATH LOCATIONS
d3.csv("deathdays.csv", function(d){
  console.log(d);
  var date = d.date;
  var deaths = d.deaths;
  var Death = d3.select('svg').append('circle')
  Death.attr('fill','black').attr('r', deaths);
});

//DRAW THE PUMP LOCATIONS
d3.csv("pumps.csv", function (data) {
  var pumpX = data.x;
  var pumpY = data.y;
  var pump = d3.select('svg').append('circle');
  pump.attr('fill','blue').attr('r',10).attr('cy', 20).attr('cx', Xscale(data.x)).attr('cy', Yscale(data.y));
});




//var streetData = [[1,12,3,14],[14,4,3,13]]
//d3.json("streets.json", function(d) {const streetData = data; console.log(streetData);});
//svg.selectAll("line").data(streetData).enter().append("line").attr("x1",function(d){return Xscale(d[0]);}).attr("x2",function(d){return Xscale(d[1]);}).attr("y1",function(d){return Yscale(d[2]);}).attr("y2",function(d){return Yscale(d[3]);}).attr("stroke", "black");
