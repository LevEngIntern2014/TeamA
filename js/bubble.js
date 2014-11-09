
var BubbleGraph = {
	diameter: 0,
	format: null,
	color: null,
	bubble: null,
	svg: null,
	show: function (user_name) {
		this.diameter = 960,
		this.format = d3.format(",d"),
    	this.color = d3.scale.category20c();

		this.bubble = d3.layout.pack()
    		.sort(null)
		    .size([this.diameter, this.diameter])
    		.padding(1.5);

		$("svg").remove();
		this.svg = d3.select("#babl_wrap").append("svg")
    		.attr("width", this.diameter)
    		.attr("height", this.diameter)
    		.attr("class", "bubble");
/*
    	d3.json("flare.json", function(error, root) {

*/
///*
user_name="lolipop";
var http_url = "https://teratail.com/api/";
var query = http_url + "users/" + user_name + "/followers?limit=50&jsonp=1";
Ayataka.getJSONP("user_follower_info", query, function (json) {
	var result = "";
	var root = {
		name: "followers",
		children: []
	};

	for (var i=0; i<json["followers"].length; i++) {
		result = result + json["followers"][i]["display_name"];
		root.children[root.children.length] = {
			name: json["followers"][i]["display_name"],
			size: 10000*Math.random()
		};
	}
//	$("#result").html(result);
	
	
	
//*/			

    		var bg = BubbleGraph;
			var node = bg.svg.selectAll(".node")
				.data(bg.bubble.nodes(bg.classes(root))
				.filter(function(d) { return !d.children; }))
				.enter().append("g")
				.attr("class", "node")
				.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

			node.append("title")
				.text(function(d) { return d.className + ": " + bg.format(d.value); });

			node.append("circle")
				.attr("r", function(d) { return d.r; })
				.style("fill", function(d) { return BubbleGraph.color(d.packageName); })
    			.attr("opacity", function(d) { return (Math.random()*0.7+0.3); });

			node.append("text")
				.attr("dy", ".3em")
				.style("text-anchor", "middle")
				.text(function(d) { return d.className.substring(0, d.r / 3); });
				
			d3.select(self.frameElement).style("height", bg.diameter + "px");
		});
	},
	classes: function (root) {
		var classes = [];

		function recurse(name, node) {
			if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
			else classes.push({packageName: name, className: node.name, value: node.size});
		}

  		recurse(null, root);
  		return {children: classes};
	}
			
}

$(function () {
	var bg = BubbleGraph;
	
	//$("#form").submit( function () {
	
		bg.show("lolipop");
/*
		var http_url = "https://teratail.com/api/";
		var query = http_url + "users/kinme/followers?jsonp=1";
		Ayataka.getJSONP("user_follower_info", query, function (json) {
			var result = "";

			for (var i=0; i<json["followers"].length; i++) {
				result = result + json["followers"][i]["display_name"];
			}
			$("#result").html(result);
		});
*/
	//	return false;
	//});

	
});
