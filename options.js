localStorage['currentPurchase'] = '';
function updatePreview() {
	backgroundTooBig(false);
	if (localStorage['base64']) {
		$("#noBackground").hide();
		$("#removeBtn").show();
		var currentBackground = JSON.parse(localStorage['base64']);
		$("#img_preview").attr("src", "data:image/png;base64, " + currentBackground.src).css("display", "block"); 
	} else {
		$("#noBackground").show();
		$("#removeBtn").hide();
		$("#img_preview").attr("src", "").hide();
	}
}

function display_logged_in_status() {
	if (localStorage['name']) {
		$("#userName").html('Signed in as ' + localStorage['name']);
		$("#reset_ver").text("(Logout)");
		$("#logInBtn, #log-in-help").hide();
		$("#logOutBtn").show();
		
	} else {
		$("#logInBtn, #log-in-help").show();
		$("#logOutBtn").hide();
		$("#userName").html("");
	}
}

chrome.extension.onMessage.addListener( function(request, sender, sendResponse) {
	if(request.new_auth_info) {
		display_logged_in_status();
		lookupPurchasedBackgrounds();
		resumePurchase();
	} else if (request.display_pictures) {
		updatePreview();	
	} else if (request.status == "imgTooBig") {
		backgroundTooBig(true);
	}
});

$(function() {
	display_logged_in_status();
	$('#logInBtn').click(function() {
		for(i = 1; i < (numberOfBackgrounds+1); i++){
			localStorage['purchased_background-'+i] = '';
		}
		prepareStore();
		chrome.extension.sendMessage({resetAuthentication: "true"});
	});
	$('#logOutBtn').click(function() {
		localStorage['gid'] = '';
		localStorage['name'] = '';
		localStorage['currentPurchase'] = '';
		display_logged_in_status();
	});	
	$("#uploadBtn").click(function() {
		$('#theFile').click();		
	});
	$('#theFile').change(function(evt) {
		var file = evt.target.files[0];
		if (!file.type.match('image.*')) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function (evt) {
			chrome.extension.sendMessage({update_history: evt.target.result.split(',')[1],backgroundSrc:1});
			updatePreview();
		};
		reader.readAsDataURL(file);
	});
	updatePreview();

	$('#removeBtn').click(function() {
		localStorage.removeItem('base64');
		updatePreview();
	});
});

function backgroundTooBig(status) {
	if (status == true) {
		$('#background-too-big').show();
	} else {
		$('#background-too-big').hide();
	}
}