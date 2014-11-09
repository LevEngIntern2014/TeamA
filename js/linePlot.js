var LinePlot = {
	width: null,
	height: null,
	xPadding: null,
	yPadding: null,
	svg: null,
	xAxisScale: null,
	yAxisScale: null,
	xAxis: null,
	yAxis: null,
	xAxisGroup: null,
	yAxisGroup: null,
	points: [[1,4],[2,2],[3,5],[4,9],[5,3],[6,1],[7,5],[8,4],[9,6],[10,7],[11,23],[12,11]],
	line: null,
	path: null,
	markers: null,
	labels: null,
	show: function () {
		this.width = 300;
		this.height = 200;
		this.xPadding = 40;
		this.yPadding = 40;

		this.svg = d3.select("#line_wrap").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svgTag").style("border","1px solid #eee");

		this.xAxisScale = d3.scale.linear().domain([1,12]).range([0+this.xPadding,this.width-this.xPadding]);
		this.yAxisScale = d3.scale.linear().domain([0,20]).range([this.height-this.yPadding,0+this.yPadding]);

		this.xAxis = d3.svg.axis().scale(this.xAxisScale);
		this.yAxis = d3.svg.axis().scale(this.yAxisScale).orient("left");

		this.xAxisGroup = this.svg.append("g").attr("class","x axis").attr("transform", "translate(0," + (this.height-this.yPadding) + ")").call(this.xAxis);
		this.yAxisGroup = this.svg.append("g").attr("class","y axis").attr("transform", "translate(" + this.xPadding + ",0)").call(this.yAxis);

		this.line=d3.svg.line().x(function(d){ return LinePlot.xAxisScale(d[0])}).y(function(d){return LinePlot.yAxisScale(d[1])});
		this.path=this.svg.append("g").append("path").attr("id","pathEntry").datum(this.points).attr("class","line").attr(
		    {
 		       d: this.line,
		        fill: "none"
		    });

		this.markers=this.svg.append("g").attr("id","markerGroup").selectAll("circle").data(this.points).enter().append("circle").attr(
		    {
		        cx: function(d){return LinePlot.xAxisScale(d[0])},
		        cy: function(d){return LinePlot.yAxisScale(d[1])},
		        r: 5,
		        fill: "magenta"
		    }).on("click",
		        function(d,i){
            		d3.select(this).attr("fill", "black");
		        }
		    );

		this.labels=this.svg.append("g").selectAll("text").data(this.points).enter().append("text").attr({
		        class: "dataPointLabels",
		        x: function(d){return LinePlot.xAxisScale(d[0])},
		        y: function(d){return LinePlot.yAxisScale(d[1])}
		    }).text(
		        function(d){return "　"+d[1]+" "}
		    );
		   
	}
	
}
