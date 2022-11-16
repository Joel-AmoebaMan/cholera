<script type="text/javascript">
var h = 700;
var w = 800;
var Xscale = d3.scaleLinear().domain([0,20]).range([0,500]);
var Yscale = d3.scaleLinear().domain([0,20]).range([0,500]);

//CREATE MAIN SVG ELEMENT
const svg = d3.select("body").append("svg").attr('width', w).attr('height', h).style('background-color', 'darkGray');
var timeline = d3.select('svg').append('g')
//DRAW THE MAP

d3.json("drawMap.json", function (d) {
  console.log(data);
});

//DRAW THE DEATH LOCATIONS
d3.csv("deathdays.csv", function(d){
  var date = d.date;
  var deaths = d.deaths;
  var timeline = d3.select('svg').append('g')
  timeline.append('rect').attr('x',25).attr('y',10).attr('fill','white').attr('width', 750).attr('height', 50);

  var Death = d3.select('svg').append('circle')
  Death.attr('fill','black').attr('r', deaths).attr('cx', function(d){

  });
});

//DRAW THE PUMP LOCATIONS
d3.csv("pumps.csv", function (data) {
  var pumpX = data.x;
  var pumpY = data.y;
  var pump = d3.select('svg').append('circle');
  pump.attr('fill','blue').attr('r',10).attr('cy', 20).attr('cx', Xscale(data.x)).attr('cy', Yscale(data.y));
});
//DRAW THE DEATH LOCATIONS
d3.csv("deaths_age_sex.csv", function (d) {
  var deathX = d.x;
  var deathY = d.y;
  var deathAge =d.age;
  var deathGender = d.gender;
  var deathSpot = d3.select('svg').append('circle');
  deathSpot.attr('fill','red').attr('r', d.age).attr('cx', Xscale(d.x)).attr('cy',Yscale(d.y));
});


</script>
