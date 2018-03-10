function setDefaults() {
	if (!localStorage['transparency']) {
		localStorage['transparency'] = 0.85;
	}
	if (!localStorage['widthMode']) {
		localStorage['widthMode'] = 'automatic';
	}
	if (!localStorage['headerColor']) {
		localStorage['headerColor'] = '#3B5998';
	}
}




// var currentTab;
// function checkForValidUrl(tabId, changeInfo, tab) {
// 	if (tab.url.indexOf('facebook.com') > -1) {
// 		chrome.pageAction.show(tabId);
// 	}
// };

// chrome.tabs.onUpdated.addListener(checkForValidUrl);

// chrome.pageAction.onClicked.addListener(function(tab) {
// 	open_options_page();
// });

// function open_options_page() {
// 	chrome.tabs.getAllInWindow(undefined, function(tabs) {
// 		for (var i = 0, tab; tab = tabs[i]; i++) {
// 			if (tab.url && tab.url=='chrome-extension://gcdkepamffmkegijpbpjnkbflkmehaga/options.html') {
// 				chrome.tabs.update(tab.id, {selected: true});
// 				return;
// 			}
// 		}
// 	chrome.tabs.create({url: 'options.html'});
// 	});
// }

function update_history(backgroundObject, isBackgroundSrc) {
	try {
		if (isBackgroundSrc) {
			localStorage['base64'] = JSON.stringify({
				src: isBackgroundSrc
			});
		} else if (backgroundObject){
			localStorage['base64'] = backgroundObject;
		}
		chrome.extension.sendMessage({display_pictures: "1"});
	} catch (e) {
		chrome.extension.sendMessage({status: "imgTooBig"});
	}
}

chrome.tabs.onUpdated.addListener(function(tabId) {
	chrome.tabs.get(tabId, function(tab) {
		if (tab.url.search("dansilver.info/oauth2callback/") > 0) {
			chrome.tabs.executeScript(tab.id, {file: "grab_GoogleID.js"});
		}
	});
});

// chrome.contextMenus.create({
// 	"title": "Set as Facebook background",
// 	"contexts": ["image"],
// 	"onclick": function (info) {
// 		$.ajax({
// 			type : 'POST',
// 			url : 'http://www.dansilver.info/fbBackgroundChanger/convert_to_base64.php',
// 			dataType : 'json',
// 			data: {
// 				url : info.srcUrl
// 			},
// 			success : function(data){
// 				open_options_page();
// 				update_history(null, data.base64);
// 			}
// 		});
// 	}
// });

chrome.extension.onMessage.addListener( function(request, sender, sendResponse) {
	if (request.method == "get_vars") {
		var background = localStorage.base64 || ' ';
		vars_string = localStorage['widthMode'] +'~~~'+localStorage['transparency'] + '~~~' + background;
		sendResponse({variables: vars_string});
    } else if (request.setDefaults) {
		setDefaults();
		chrome.tabs.reload(sender.tab.id);
	} else if (request.update_history) {
		if (request.backgroundSrc) {
			update_history(null, request.update_history);
		} else {
			update_history(request.update_history, null);
		}
	} else if (request.GoogleID) {
		localStorage['gid']=request.GoogleID;
		localStorage['name']=request.GoogleName;
		chrome.extension.sendMessage({new_auth_info: 'true'});
		chrome.tabs.update(currentTab, {active: true});
		chrome.tabs.remove(sender.tab.id);
	} else if (request.resetAuthentication) {
		chrome.tabs.getSelected(null, function(tab){ 
			currentTab = tab.id;
			chrome.tabs.create({"url": "https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&response_type=token&redirect_uri=http://dansilver.info/oauth2callback&client_id=293292404055.apps.googleusercontent.com&hl=en&from_login=1&as=2e8b1573426b83ce&pli=1&authuser=0"});
		});
	}
});