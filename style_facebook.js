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
        //Display Quotes begin 
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

            //Disaply quotes end
            a = 2;

          });
        }
      }
      else if (items.onoffswitch === "false") {

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

        updateBackgroundSettings();

      }
      else if (items.statusicon === "false") {

        //when its not minimal mode (didnt decide what to do here )
      }
    });


  });
}



updateBackgroundSettings();