define(["jquery", "jquerymobile", "jquery.loadTemplate-1.2.4","../cordova"], function($) {

    function getStrikedDays(date) {
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      var i = 1;
      var days="";
      for(i = 1; i <= lastDay.getDate(); i++) {
        if (i < date.getDate()) {
          days += "<strike>" + i + ".</strike>  "
        } else if (i == date.getDate()) {
          days += "<b>" + i + ".  </b>"
        } else {
          days += i+".  "
        }
      }
      return days;
    }

    function getMedalsFor(player) {
      var m = ""
      if (player.medals) {
        if ((player.medals.gold > 0) && (player.medals.gold != 1))
          m+="<img src='img/medals/gold.png'></img><sup>" + player.medals.gold + "</sup>";
        else m+="<img src='img/medals/gold.png'></img>";
        if ((player.medals.silver > 0) && (player.medals.silver != 1))
          m+="<img src='img/medals/silver.png'></img><sup>" + player.medals.silver + "</sup>";
        else m+="<img src='img/medals/silver.png'></img>";
        if ((player.medals.bronze > 0) && (player.medals.bronze != 1))
          m+="<img src='img/medals/bronze.png'></img><sup>" + player.medals.bronze + "</sup>";
        else m+="<img src='img/medals/bronze.png'></img>"
      }
      return m;
    }

    function loadRanking() {
      var date = new Date();
      var months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      $("#month").append(months[date.getMonth()] + " " + date.getFullYear());
      $("#days").html(getStrikedDays(date));
      $.ajax({
        url: "http://test.netpanzer.info/public/jsonRanking.php",
        type: "GET",
        crossDomain: true,
        headers: {"Authorization": "Basic dGVzdDpjbTBuMSNzSw=="},
        success: function( data ) {
          var parsed = $.parseJSON(data);
          var i, player;
          $.each(parsed, function (i, p) {
            $("#tableRanking > tbody").loadTemplate($("#playerRankRow-tpl"), {
                playername: document.createTextNode(p.player),
                medals: getMedalsFor(p),
                activityrate: '<small>' + p.acitivityrate + '</small><span class="rate" style="width:' + (p.acitivityrate * 10) +'px"></span>',
                expertrate: '<small>' + p.expertrate + '</small><span class="rate" style="width:' + (p.expertrate * 10) +'px"></span>',
                efficiency: p.efficiency + "%",
                killerrate: p.killerrate,
                pointsall: p.pointsall,
                championsrate: p.championsrate,
                strength: '<span class="strength" style="width:' + p.strength +'px"></span><small>' + p.strength + '%</small>'
            }, {"append": true, "overwriteCache": true});
          });
        },
        error: function() {
          console.log("FAIL!");
        }
      });
    }

    function loadInfo() {
        $.getJSON("http://www.netpanzer.info/Server-Browser/JsonData/?_=", function(data) {
            var i, gameserver;
            $.each(data, function (i, gameserver) {
                if (typeof gameserver.error != "undefined") return;
                $("#serverList").append("<li data-wrapperels='div' ><a id='serverItem"+i+"' href='#serverDetails"+i+"' data-transition='none' class='listitem'></a></li>");
                $("#serverItem"+i).loadTemplate($("#gameserver"), {
                    mapnameseo: "img/maps/" + gameserver.mapnameseo + ".png",
                    mapname: gameserver.mapname,
                    hostname: document.createTextNode(gameserver.hostname),
                    host: gameserver.host,
                    port: gameserver.port,
                    numplayers: gameserver.numplayers,
                    uptime: gameserver.uptime,
                    hostcountryname: gameserver.hostcountryname,
                    hostcountrycode: "img/country/"+ gameserver.hostcountrycode.toLowerCase() +".gif"
                });

                // Load details and append to pageContainer
                if ($("#serverDetails"+i).size() != 0)
                    $("#serverDetails"+i).empty();
                else {
                    $.mobile.pageContainer.append("<div id='serverDetails"+i+"' data-role='page' data-add-back-btn='true' class='sb_page'></div>");
                }
                $("#serverDetails"+i).loadTemplate($("#gameserverDetails-tpl"), {
                    tableid: "tableDetails"+i,
                    mapnameseo: "img/maps/" + gameserver.mapnameseo + ".png",
                    mapname: gameserver.mapname,
                    numplayers: gameserver.numplayers,
                    maxplayers: gameserver.maxplayers,
                    outposts: gameserver.outposts,
                    uptime: gameserver.uptime,
                    units_per_player: gameserver.units_per_player,
                    maxunits: gameserver.maxunits,
                    gamestyle: gameserver.gamestyle,
                    gamestyleText: gameserver.gamestyleText,
                    mapcycle: gameserver.mapcycle,
                    gameversion: gameserver.gameversion,
                    host: gameserver.host,
                    port: gameserver.port,
                    uptime: gameserver.uptime,
                    hostname: document.createTextNode(gameserver.hostname),
                    hostcountryname: gameserver.hostcountryname,
                    hostcountrycode: "img/country/"+ gameserver.hostcountrycode.toLowerCase() +".gif"
                }, {"append": true, "overwriteCache": true});

                if (gameserver.numplayers > 0) {
                    $("#tableDetails"+i).show();
                    $("#tableDetails"+i+" > tbody").empty();
                    $.each(gameserver.players, function (j, p) {
                        $("#tableDetails"+i+" > tbody").loadTemplate($("#playerRow-tpl"), {
                            playername: document.createTextNode(p.player),
                            kills: p.kills,
                            deaths: p.deaths,
                            score: p.score,
                            killerRate: (typeof p.additional != "undefined") ? p.additional.killerRate : "-",
                            efficiency: (typeof p.additional != "undefined") ? (p.additional.efficiency+"%") : "-"
                        }, {"append": true, "overwriteCache": true});
                    });
                } else {
                   $("#tableDetails"+i).hide();
                }

                // Trigger 'create' for jqm to initialize widgets for this page
                $("#serverDetails"+i).trigger("create");

                // Need to manually apply css to header and footer,
                // because they do not respond to page "create" event
                $("#serverDetails"+i).find('div[data-role="header"], div[data-role="footer"]').each(
                    function( ){
                        var dR = $(this).attr('data-role');
                        var dT = $(this).attr('data-theme');
                        $(this).addClass('ui-' + dR + ' ui-bar-' + dT).attr('role', (dR == 'header' ? 'banner' : 'contentinfo') ).children('h1, h2, h3, h4').each(
                            function( ){
                                $(this).addClass('ui-title').attr({'role':'heading', 'aria-level':'1'});
                            }
                        )
                        if (dR == 'header') {
                           $(this).children('a').addClass('ui-btn-left');
                        }
                    }
                );
            });
            if ($.mobile.activePage.is("#home")) $('#serverList').listview('refresh');
        }).fail(function() {
            navigator.notification.alert('Check your internet connection!',
                function(button) {
                    if (button == 1) {
                        navigator.app.exitApp();
                    }
                },
                'Warning'
            );
        });
    }

    $(document).on("deviceready", function(event, ui) {
        $.mobile.defaultPageTransition = 'none';
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;

        $(document).bind("backbutton", function(){
            if (!$.mobile.activePage.is("#home")) {
                $.mobile.changePage('#home', {transition: 'none'});
            } else {
                navigator.notification.confirm('Really quit NetPanzerSB?',
                    function(button) {
                        if (button == 2) {
                            navigator.app.exitApp();
                        }
                    },
                    'Quit',
                    'Cancel,Exit'
                );
            }
        });

        $( document ).bind( "pagebeforechange", function( event, data ) {
          if (data.toPage[0].id == "home") $('#serverList').listview('refresh');
          if (data.toPage[0].id == "ranking") {
            // console.log(data.toPage[0].id);
            // loadRanking();
          }
        });

        loadInfo();
        loadRanking();
        setInterval(function() {
            if (!$.mobile.activePage.is("#ranking") && !($.mobile.activePage.is("#info"))) {
                $("#serverList").empty();
                loadInfo();
            }
        }, 30000);
    });
    if (document.URL.match(/^http?:/)) $(document).trigger("deviceready");
});
