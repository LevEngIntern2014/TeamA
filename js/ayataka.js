var Ayataka = {
	getJSONP: function (jsonp_callback, url, callback) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'jsonp',
			jsonpCallback: jsonp_callback,
			success: callback,
			error: function (XMLHttpRequest, textStatus, errorThrown){ console.log(textStatus); }
		});
	}
}

