let a = 1;
let k = 1;

var userData = [];
setInterval(function () {
  updateBackgroundSettings();
}, 1000);

window.onresize = function () {
  autoWidth();
};
autoWidth();
function autoWidth() {
  if (userData[0] == "automatic") {
    $("#chromeFacebookbackground").css("background-size", document.width);
  }
}


function updateBackgroundSettings() {
  if ($("body").hasClass("UIPage_LoggedOut")) return;
  chrome.extension.sendMessage({ method: "get_vars" }, function (response) {
    userData = response.variables.split("~~~");

    // Focus Mode

    chrome.storage.local.get(/* String or Array */["onoffswitch"], function (
      items
    ) {
      if (items.onoffswitch === "true") {

        $("._5pcb._dp7._4j3f").css("display", "none");
        $("._2t-f").css("display", "none");
        $(".bottomContent").css("color", "white");
        $('.home_right_column').css("display", "none");

        $('.uiFutureSideNav').css("display", "none");
        $('._64b').css("display", "none");

        if (a === 1) {
          let quote = "Be yourself; everyone else is already taken.";
          let author = " Oscar Wilde";
          $(function () {
            if (k === 1) {
              var baseUrl = "https://talaikis.com/api/quotes/random/";
              $.ajax({
                url: baseUrl,
                type: 'GET',
                dataType: 'json',
                success: function (res) {
                  // console.log(res.quote);
                  // console.log(res.author);
                  quote = res.quote;
                  author = res.author;


                  $("body").css("overflow", "hidden");
                  $("#contentArea").css("z-index", "200");

                  $('#bottomContent').html("\
                    <table >  \<tr>\<td></td>\
          <td rowspan=2><img src='https://source.unsplash.com/random/1500x800/?nature,night' \
          style='margin-left:-300px;margin-top:-180px;z-index:-1;\
\
          '></td> \
        </tr >  \
                    <tr>\
          <td colspan=2 > <p style='margin-top:-400px;font-size:36px; \
          font-weight:900;text-transform:uppercase;color:white ; \
          line-height:55px;margin-left:-200px;max-width:800px;\
          word-wrap:break-word;'>"+ quote + "</p></td>\
        </tr>  \
      </table > ")



                }
              });
              k = 2;

            }


            a = 2;

            // $("body").prepend('<div id="chromeFacebookbackground"></div>');
          });
        }
      }
      else if (items.onoffswitch === "false") {
        // console.log("it worked");
        $("._5pcb._dp7._4j3f").css("display", "inline");
        $("._2t-f").css("display", "inline");
        $('._2s25').css('color', 'white');
        if (a === 2) {
          location.reload();
          a = 1;
        }
      }
    });

    //minimal mode

    chrome.storage.local.get(/* String or Array */["statusicon"], function (
      items
    ) {
      if (items.statusicon === "true") {
        $('.home_right_column').css("display", "none");

        $('.fixed_elem').css("display", "none");
        $('._64b').css("display", "none");
        // if (a === 1) {
        //   $(function () {

        //     $('#bottomContent').html("<img src='https://source.unsplash.com/random/1000x470' style='margin-left:-20px'/>")
        //     a = 2;
        //   });
        // }
        updateBackgroundSettings();

      }
      else if (items.statusicon === "false") {
        // if (a === 2) {
        //   location.reload();
        //   a = 1;
        // }
        // Add focus mode

      }
    });

    $('._15p4._2pis').css('color', 'black');
    if (userData[2] != " ") {

      $('#pagelet_navigation').css('display', 'none');
      $('#leftCol').css('display', 'none');
      $('._4-u2._1-ib._2tyk._20os._4-u8').css('display', 'none');
      $('.lpfm').css('display', 'none');
      $('#pagelet_rhc_footer').css('display', 'none');
      $('._1qkq._1qks').css('display', 'none');
      $('.clearfix').css('background-color', 'white');
      $('._1-ia').css('display', 'none');

      $('#pagelet_ego_pane').css('display', 'none');

      //background set
      if (!$("#chromeFacebookbackground").length) {
        $("body").prepend('<div id="chromeFacebookbackground"></div>');
      }
      $("#pagelet_navigation").css("visibility", "hidden");
      $("#leftCol").css("visibility", "hidden");
      var currentBackground = JSON.parse(userData[2]);
      $("#chromeFacebookbackground").css("background-color", "white");
      autoWidth();
    } else {
      $("#chromeFacebookbackground").remove();
    }
    if (!$("#background_changer_link").length) {
      $("#pageNav .firstItem").after(
        '<li id="background_changer_link"  class="navItem"><a href="' +
        chrome.extension.getURL("options.html") +
        '" target="_blank" class="navLink">Customize</a></li>'
      );
    }
    $(".fbTimelineTimePeriod").css("background", "none");
    $(
      "#leftCol, .UIStandardFrame_Container, .fbTimelineUFI, .timelineUnitContainer, div#contentCol.homeFixedLayout, .ego_column"
    ).css("background-color", "rgba(255,255,255," + userData[1] + ")");
    $(".fbTimelineCapsule .timelineUnitContainer, #pageFooter").css(
      "background-color",
      "rgba(255,255,255," + userData[1] + ")"
    );
    //footer
    $("#pageFooter").css({
      "border-radius": "5px",
      height: "30px"
    });
    $("#navSearch .uiTypeahead").css("border", "none");
    $("#navSearch .uiSearchInput").css("border-top", "none");
    $("#pageNav .tinyman .headerTinymanPhoto").css({
      border: "none",
      "border-top": "none"
    });
    $(
      "#pageNav .navItem a.navLink, .fbJewel a.jewelButton, #pageLogo a,#navAccountLink"
    ).hover(function () {
      $(this).css("background-color", "transparent");
    });
    $("#pageNav .navItem a").addClass("targetAfter");
  });
}
