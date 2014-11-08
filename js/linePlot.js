var width = 600;
var height = 400;
var xPadding = 40;
var yPadding = 40;

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "svgTag").style("border","1px solid #eee");

var xAxisScale = d3.scale.linear().domain([1,12]).range([0+xPadding,width-xPadding]);
var yAxisScale = d3.scale.linear().domain([0,20]).range([height-yPadding,0+yPadding]);

var xAxis = d3.svg.axis().scale(xAxisScale);
var yAxis = d3.svg.axis().scale(yAxisScale).orient("left").ticks(1);

var xAxisGroup = svg.append("g").attr("class","x axis").attr("transform", "translate(0," + (height-yPadding) + ")").call(xAxis);
var yAxisGroup = svg.append("g").attr("class","y axis").attr("transform", "translate(" + xPadding + ",0)").call(yAxis);

var points=[[1,4],[2,2],[3,5],[4,9],[5,3],[6,1],[7,5],[8,4],[9,6],[10,7],[11,23],[12,11]];

var line=d3.svg.line().x(function(d){ return xAxisScale(d[0])}).y(function(d){return yAxisScale(d[1])});
var path=svg.append("g").append("path").attr("id","pathEntry").datum(points).attr("class","line").attr(
    {
        d: line,
        fill: "none"
    });

var markers=svg.append("g").attr("id","markerGroup").selectAll("circle").data(points).enter().append("circle").attr(
    {
        cx: function(d){return xAxisScale(d[0])},
        cy: function(d){return yAxisScale(d[1])},
        r: 5,
        fill: "magenta"
    }).on("click",
        function(d,i){
            d3.select(this).attr("fill", "black");
        }
    );

var labels=svg.append("g").selectAll("text").data(points).enter().append("text").attr({
        class: "dataPointLabels",
        x: function(d){return xAxisScale(d[0])},
        y: function(d){return yAxisScale(d[1])}
    }).text(
        function(d){return "　"+d[1]+" "}
    );

buttonClicked=function (){
    var svg = document.getElementById("svgTag");
    var svg_xml = (new XMLSerializer).serializeToString(svg);

    d3.select("textarea").text(
        svg_xml
    );

};