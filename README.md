<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Cholera Outbreak</title>
        <script src="https://d3js.org/d3.v7.min.js"></script>

        <!-- <script type="textjavascript" src="G:\My Drive\dataVis\cholera\d3-7.6.1 (1).js"></script> -->
        <link rel="stylesheet" href="styles.css"/>
    </head>

    <body>
        <div class="grid-container">
            <div class="grid-item">
                  <h1>London's 1854 Cholera Epidemic</h1>
                <!--  <h2>A Case Study in Data Visualization: </h2> -->
            </div>
            <div class="grid-item">
              <h2>A Case Study in Data Visualization: </h2>
              <!-- <img src="microscopicCholera.jpg" > -->
            </div>
            <div class = 'grid-item'>
              <a href="data\documentation.html">Documentation</a><br>
              <a href="https://youtu.be/rppXWly2ywc">Video</a>
            </div>
            
       </div>
        <div id='mapArea'>
        </div>


       <script type="text/javascript">
       var h = 600;
       var w = 1200;
       var Xscale = d3.scaleLinear().domain([4,20]).range([500,50]);
       var Yscale = d3.scaleLinear().domain([4,20]).range([500,25]);
       //fix the domains here^

       //CREATE MAIN SVG ELEMENT
       const svg = d3.select("body").append("svg").attr('width', w).attr('height', h).style('background-color', 'lightGray');
       svg.append('text').text('Map of London').attr('x',175).attr('y',25).attr('font-style','spectral').attr('font-weight','bold').attr('font-size','20px');



       //DRAW THE LEGEND
       svg.append('circle').attr('fill','blue').attr('r',8).attr('cx',850).attr('cy',80);
       svg.append('text').text('Water Pump').attr('x', 870).attr('y',85).attr('font-style','spectral').attr('font-weight','bold');
       //male death
       svg.append('circle').attr('fill','red').attr('r',8).attr('cx',850).attr('cy',100).attr('stroke','black');
       svg.append('text').text('Male Death').attr('x', 870).attr('y',105).attr('font-style','spectral').attr('font-weight','bold');
       //female death
       svg.append('circle').attr('fill','red').attr('r',8).attr('cx',850).attr('cy',120).attr('stroke','white');
       svg.append('text').text('Female Death').attr('x', 870).attr('y',125).attr('font-style','spectral').attr('font-weight','bold');
       //streets
       svg.append('line').attr('x1', 840).attr('x2',865).attr('y1',145).attr('y2',145).attr('stroke','black').attr('stroke-width','2px');
       svg.append('text').text('Street').attr('x', 870).attr('y',145).attr('font-style','spectral').attr('font-weight','bold');

      //create axis for deathdays graph
      // svg.append('line').attr('x1',500).attr('x2',840).attr('y1',481).attr('y2',481).attr('stroke','black').attr('stroke-width','2px');
       //svg.append('line').attr('x1',500).attr('x2',500).attr('y1',482).attr('y2',50).attr('stroke','black').attr('stroke-width','2px');
       svg.append('text').text('Deaths per Day').attr('x',600).attr('y',25).attr('font-style','spectral').attr('font-weight','bold').attr('font-size','20px');





       //DRAW THE MAP
       d3.json("data\streets.json").then(function(data){
         console.log('1');
         //for (var i = 0; i< data.length; i++) {
           //var pointA = data[i][0];
          // var pointB = data[i][1];

  //         line.attr("x1", function(d) {return Xscale(pointA.x);})
    //       .attr("x2", function(d) {return Xscale(pointB.x);})
      //     .attr("y1", function(d) {return Yscale(pointA.y);})
        //   .attr('y2', function(d) {return Yscale(pointB.y);})
          // .attr('fill','white')
          // .attr('stroke','black')
          // .attr("stroke-width","2px");
           //
           var lineFunction = d3.line()
                          //  .x(function(d, i) {return d.x*25})
                            .x(function(d,i) {return Xscale(d.x)})
                          //  .y(function(d, i) {return d.y*25})
                            .y(function(d,i) {return Yscale(d.y)})
                            //.interpolate("linear')
                            svg.selectAll(".line")
                              .data(data)
                              .enter()
                              .append("path")
                              .attr('fill','none')
                              .attr('stroke','black')
                              .attr("stroke-width","2px").attr("d", lineFunction)
;

       });
       //DRAW THE DEATH LOCATIONS
       d3.csv("data\deaths_age_sex.csv", function (d) {
         var deathX = d.x;
         var deathY = d.y;
         var deathAge =d.age;
         var deathGender = d.gender;
         var deathSpot = d3.select('svg').append('circle');
           var div = d3.select('body').append('div').attr("class","tooltip").style("opacity",0);
         deathSpot.attr('fill','red')
         .attr('r', d.age).attr('cx', Xscale(d.x)).attr('cy',Yscale(d.y))
         .attr('stroke',function (d) {if (deathGender == 0) {return 'black';} else {return 'white';}})
         .attr('id',function(d,i) {return i;})
         .on('mouseover', function (d,i) {
           d3.select(this).transition().duration('100').attr('r',10);
           //d3.select(this).transition().duration('100').append('text').text('buh').attr('x',10).attr('y',10);
           //div.transition().duration('100').style('opacity',1);
         })
         .on('mouseout', function (d,i) {
           d3.select(this).transition().duration('200').attr('r',function(d) {return deathAge}).attr('fill','red');
        })
        //provide data upon a hover
       });
       //DRAW THE PUMP LOCATIONS
       d3.csv("data\pumps.csv", function (data) {
         var pumpX = data.x;
         var pumpY = data.y;
         var pump = d3.select('svg').append('circle');
         pump.attr('fill','blue').attr('r',6).attr('cy', 20).attr('cx', Xscale(data.x)).attr('cy', Yscale(data.y))
         //.style("cursor","pointer").transition
        .on("hover", function (d) {
          pump.attr('fill','red');
        } );


       });


       //DRAW a barchart
       d3.csv("data\deathdays.csv", function(date,i){
         var index = i;
         var dates = date.date;
         var deaths = date.deaths;
         var deathsPerDay = d3.select('svg').append('rect');
         deathsPerDay.attr('fill', 'red')
         .attr('x',function(d,i) {return (index*8 + 600)})
         .attr('y',function(d) {return (520 - deaths*2)})
         .attr('width',8)
         .attr('height',function(d) {return (deaths*2);})
         .on('mouseover', function (d,i) {
           d3.select(this).transition().duration('100').attr('fill','black');
            console.log(date.deaths);
            console.log(date.date);
  //         console.log(d3.select(this));
           //d3.select(this).transition().duration('100').append('text').text('buh').attr('x',10).attr('y',10);
           //div.transition().duration('100').style('opacity',1);
         })
         .on('mouseout', function (d,i) {
           d3.select(this).transition().duration('200').attr('fill','red');
        })
       });



//CREATE THE AXIS FOR BARCHART
      var xscale = d3.scaleLinear().domain([0,60]).range([0,320]);
//      var labels = ['a','b','c','d']
    //  var xscale = d3.scale.ordinal().domain(labels).rangeBands([0,8]);
      var yscale = d3.scaleLinear().domain([0,160]).range([320,0]);
      var Xaxis = d3.axisBottom().scale(xscale).ticks();
      var Yaxis = d3.axisLeft().scale(yscale).ticks();

      svg.append('g').attr("transform","translate(600,520)").call(Xaxis);
      svg.append('g').attr("transform","translate(600,200)").call(Yaxis);
//      d3.csv("deathdays.csv", function (date) {
  //      d3.csv("deaths_age_sex.csv", function (death) {
    //      j=0;
          //for (i=0; i<date.length;i++) {
        //    var day = date[i].date;
      //      console.log(day);
    //        var count = date[i].deaths;
  //          console.log(count);
//            for (k = 0;k<count;k++) {
            //  day = deaths[j].date;
          //    j++;
        //      console.log(date);
      //      }
    //      }
  //      })
//      });

    //Create the waste demonstration
      //create the populace dataset
      var populace = [];
      var total = 200;
      var xscale = d3.scaleLinear().domain([0,1]).range([50,450]);
      var yscale = d3.scaleLinear().domain([0,1]).range([50,450]);
      for (i=0; i<total ;i++) {
        var newpopx = xscale(Math.random());
        var newpopy = yscale(Math.random());
        populace.push([newpopx,newpopy]);}


      var people = svg.selectAll('circle').data(populace).enter().append('circle');
       people.attr('cx', function(d) {return xscale(populace[0]*100);}).attr('cy',function(d) {return populace[1];}).attr('r',10).attr('fill','brown');
 </script>
      //</script>

  </body>
</html>
