$(function (){

// user_name="lolipop";
// var http_url = "https://teratail.com/api/";
// var query = http_url + "users/" + user_name + "/tags?jsonp=1";
// Ayataka.getJSONP("user_tag_info", query, function (json) {


user_name="lolipop";
var http_url = "https://teratail.com/api/";
var query = http_url + "users/" + user_name + "/questions?limit=30&jsonp=1";
Ayataka.getJSONP("user_question_info", query, function (json) {


var hash={};

for (var i=0; i<json["questions"].length; i++) {

	// for(var key in hash[json["questions"][i]["tags"]]){
	// 	console.log(hash[key]);
	// }
	//console.log(json["questions"][i]["tags"][0]);

	for(var j=0; j<json["questions"][i]["tags"].length; j++){
		if(hash[json["questions"][i]["tags"][j]] == undefined){
			hash[json["questions"][i]["tags"][j]] = 1;
		}
		else {
			hash[json["questions"][i]["tags"][j]]+=1;
		}
		console.log(json["questions"][i]["tags"][j]);
		
	}
}


var dataset =[];

var colors = ["#738eaf","#8caa62","#d0b862","#d98d55","#c0705d","#a5a5a5","#33aaff"]

var j=0;
var sum=0;
for(var key in hash){
sum+= hash[key];
++j;
if(j>5){
	break;
}
}

var i=0;
for(var key in hash){
	dataset[i] = {legend:key, value: Math.floor(hash[key]/sum *100) , color:colors[i]};
	i++;
	if(i>5){
		break;
	}
}

		var width = 960;
		var height = 500;
		var radius = 200;

		var svg = d3.select("#tag_pie_chart").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var arc = d3.svg.arc()
				.outerRadius(radius)
				.innerRadius(100);

		var pie = d3.layout.pie()
				.sort(null)
				.value(function(d){ return d.value; });

		var g = svg.selectAll(".fan")
				.data(pie(dataset))
				.enter()
				.append("g")
				.attr("class", "fan")

		g.append("path")
			.attr("d", arc)
			.attr("fill", function(d){ return d.data.color; })
		
		g.append("text")
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.style("text-anchor", "middle")
			.text(function(d) { return [d.data.legend,d.data.value + "%" ]; });

});



});


