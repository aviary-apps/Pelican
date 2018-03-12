
chrome.extension.onMessage.addListener( function(request, sender, sendResponse) {
	if (request.method == "get_vars") {
		var background = localStorage.base64 || ' ';
		vars_string = localStorage['widthMode'] +'~~~'+localStorage['transparency'] + '~~~' + background;
		sendResponse({variables: vars_string});

	}
});