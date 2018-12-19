let fetch_on_focus_mode = true;
let minimal_mode = false;

setInterval(function () {
  updateBackgroundSettings();
}, 1000);

///////////////////
//// Features ////
/////////////////

function fetchFocusBG() {
  let quote = "Be yourself; everyone else is already taken.";
  $(function () {
    var baseUrl = "https://talaikis.com/api/quotes/random/";
    $.ajax({
      url: baseUrl,
      type: "GET",
      dataType: "json",
      success: function (res) {
        quote = res.quote;
        author = res.author;

        $("body").css("overflow", "hidden");
        $("#contentArea").css("z-index", "200");

        $("#bottomContent").html(
          "\
          <table >  <tr><td></td>\
            <td rowspan=2><img src='https://source.unsplash.com/random/" +
          screen.width + "x" + screen.height +
          "/?nature,night' \
              style='margin-top:-180px;margin-left:-350px;z-index:-1;\
              '></td> \
            </tr >  \
            <tr>\
              <td colspan=2 > <p style='margin-top:-400px;font-size:36px; \
              font-weight:900;text-transform:uppercase;color:white ; \
              line-height:55px;margin-left:-200px;max-width:800px;\
              word-wrap:break-word;'>" +
          quote +
          "</p></td>\
            </tr>  \
          </table > "
        );
      }
    });

  });

}

function removeLeftSideBar() {
  $(".uiFutureSideNav").css("display", "none");
}

function removeRightSideBar() {
  $(".home_right_column").css("display", "none");

}

function removeNotificationTray() {
  $("._2t-f").css("display", "none");
}

function showNotificationTray(){
  $("._2t-f").css("display", "inline");
}

function removeTimeline() {
  $("._5pcb._dp7._4j3f").css("display", "none");
}

function showTimeline(){
  $("._5pcb._dp7._4j3f").css("display", "inline");
}

function UIImprovements(){

    //Remove Footer 
    $("._64b").css("display", "none");
}




/////////////////////////////
//  Extensions main part xD //
//////////////////////////////


function updateBackgroundSettings() {
  if ($("body").hasClass("UIPage_LoggedOut")) return;
  chrome.extension.sendMessage({ method: "get_vars" }, function (response) {
    
    
    /////////////////
    // Focus Mode //
    ///////////////

    chrome.storage.local.get(/* String or Array */["onoffswitch"], function (
      items
    ) {
      if (items.onoffswitch === "true") {
        
        UIImprovements();
        removeTimeline();
        removeNotificationTray();
        removeRightSideBar();
        removeLeftSideBar();

        if (fetch_on_focus_mode === true) {
          // To ensure that request only goes once
          // This fucntion returns quote and new background image
          fetchFocusBG();
          fetch_on_focus_mode = false;
        }


      } else if (items.onoffswitch === "false") {
        
        showNotificationTray();
        showTimeline();

        if (fetch_on_focus_mode === false) {
          location.reload();
          fetch_on_focus_mode = true;
        }
      }
    });

    /////////////////
    //Minimal mode //
    ///////////////////
    
    chrome.storage.local.get(/* String or Array */["statusicon"], function (
      items
    ) {
      if (items.statusicon === "true") {
        UIImprovements();
        removeRightSideBar();
        removeLeftSideBar();
        minimal_mode = false;
        updateBackgroundSettings();
      } 
      else if (items.statusicon === "false") {
        //when its not minimal mode (didnt decide what to do here )
        // at the moment it is just realoading the website
        if (minimal_mode === true) {
          location.reload();
          minimal_mode = false;
        }
      }
    });
  });
}

updateBackgroundSettings();
