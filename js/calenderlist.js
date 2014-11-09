
var http_url = "https://teratail.com/api/";
var query = http_url + "users/" + "lolipop" + "/replies?limit=12&jsonp=1";
Ayataka.getJSONP("user_reply_info", query, function (json) {
	var result = "";
	var ary = ['jan','feb','mar','apl','may','jun','jly','aug','sep','oct','nov','dic'];
	for (var i=0; i<json["replies"].length; i++) {
		result = result + json["replies"][i]["body_str"];
		document.getElementById(ary[i]).innerHTML = json["replies"][i]["body"];
	}
	console.log(result);
});
