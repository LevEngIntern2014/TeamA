var BubbleGraph = {
	diameter: 0,
	format: null,
	color: null,
	bubble: null,
	svg: null,
	node:null,
	show: function (user_name) {
		this.diameter = 400,
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
//var http_url = "https://teratail.com/api/";
//var query = http_url + "users/" + user_name + "/followers?limit=50&jsonp=1";
//Ayataka.getJSONP("user_follower_info", query, function (json) {

var http_url = "http://153.121.39.65/php/getBubbledata.php";
var query = http_url + "?name=" + user_name;
console.log(query);
$.getJSON(query, function (json) {
	
	var result = "";
	var root = {
		name: "followers",
		children: []
	};
	
	root.children[root.children.length] = {
			name: "lolipop",
			size: "10000"
	};
	
	for (var key in json) {
		root.children[root.children.length] = {
			name: key,
			size: 2500*json[key]
		};
	}
/*
	for (var i=0; i<json["followers"].length; i++) {
		result = result + json["followers"][i]["display_name"];
		root.children[root.children.length] = {
			name: json["followers"][i]["display_name"],
			size: 10000*Math.random()
		};
	}
*/
	
//	$("#result").html(result);
	
	
	
//*/			

    		var bg = BubbleGraph;
			bg.node = bg.svg.selectAll(".node")
				.data(bg.bubble.nodes(bg.classes(root))
				.filter(function(d) { return !d.children; }))
				.enter().append("g")
				.attr("class", "node")
				.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

			bg.node.append("title")
				.text(function(d) { return d.className + ": " + bg.format(d.value); });

			bg.node.append("circle")
				.attr("r", function(d) { return d.r; })
//				.style("fill", function(d) { return BubbleGraph.color(d.packageName); })
//    			.attr("opacity", function(d) { return (Math.random()*0.7+0.3); });
				.attr("fill", function(d,i) {
					if (i==0) {
						return "none";
					} else {
						return "#00B2AF";
					}
				})			
				.attr("stroke",function (d,i) {
					if (i==0) {
						return "#8f9493";
					} else {
						return "none";
					}
				})
				.on("mouseover", function (d,i) {
					d3.select(this)
						.attr("transform", "scale(2)")
						
						
//				alert(typeof BubbleGraph.node[0].length);
						d3.select(BubbleGraph.node[0][i])
							.append("text")
							.attr("dy", ".3em")
							.style("text-anchor", "middle")
							.text(function(d) { return d.className.substring(0, d.r / 3); })
							.style("color", function (d,i) {
							if (i==0) {
								return "black";
							} else {
								return "white";
							}
						});
					
				})
				.on("mouseout", function (d, i) {
					d3.select(this).attr("transform", "scale(1)");
					d3.select(BubbleGraph.node[0][i]).select("text").remove();
				});



/*
			node.append("text")
				.attr("dy", ".3em")
				.style("text-anchor", "middle")
				.text(function(d) { return d.className.substring(0, d.r / 3); })
				.style("color", function (d,i) {
					if (i==0) {
						return "black";
					} else {
						return "white";
					}
				});
*/
				
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
