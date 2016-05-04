// define(["jquery", "jquerymobile", "jquery.loadTemplate-1.2.4","../cordova"], function($) {
define(["jquery", "jquerymobile", "jquery.loadTemplate-1.2.4"], function($) {

    function getTop10MedalsFor(player) {
      var m = ""
      if(typeof(player) === 'undefined') return m;

      if (!!player.gold)
        m+="<img src='img/medals/gold.png'/><sup>" + player.gold.length + "</sup>";
      if (!!player.silver)
        m+="<img src='img/medals/silver.png'/><sup>" + player.silver.length + "</sup>";
      if (!!player.bronze)
        m+="<img src='img/medals/bronze.png'/><sup>" + player.bronze.length + "</sup>";

      return m;
    }

    function getMedalsFor(player) {
      var m = ""
      if (!player) return m;

      if (player.medals) {
        if ((player.medals.gold > 0) && (player.medals.gold != 1))
          m+="<img src='img/medals/gold.png'/><sup>" + player.medals.gold + "</sup>";
        else m+="<img src='img/medals/gold.png'/>";
        if ((player.medals.silver > 0) && (player.medals.silver != 1))
          m+="<img src='img/medals/silver.png'/><sup>" + player.medals.silver + "</sup>";
        else m+="<img src='img/medals/silver.png'/>";
        if ((player.medals.bronze > 0) && (player.medals.bronze != 1))
          m+="<img src='img/medals/bronze.png'/><sup>" + player.medals.bronze + "</sup>";
        else m+="<img src='img/medals/bronze.png'/>"
      }
      return m;
    }

    function loadHallOfFame() {
      $.ajax({
        url: "http://www.netpanzer.info/hallOfFame.json",
        type: "GET",
        crossDomain: true,
        success: function( data ) {
          // Top 10
          $.each(data.alltime, function (i, p) {
            $("#tableTop10 > tbody").loadTemplate($("#playerTop10Row-tpl"), {
              countryflag: (!!p.iso2) ? ("img/country/"+ p.iso2.toLowerCase() +".gif") : "",
                rank: p.allTimePos + ".",
                playername: i,
                medals: getTop10MedalsFor(p),
                score: p.allTimeValue
            }, {"append": true, "overwriteCache": true});
          });
          $("#tableTop10").table("refresh");

          // Monthly winners
          var monthly = data.monthly;
          for (var i=0; i < data.monthly.length; i+=3) {
            $("#tableMonthlyWinners > tbody").loadTemplate($("#monthlyWinnerRow-tpl"), {
                countryflag1: (!!monthly[i].iso2) ? ("img/country/"+ monthly[i].iso2.toLowerCase() +".gif") : "",
                countryflag2: (!!monthly[i+1].iso2) ? ("img/country/"+ monthly[i+1].iso2.toLowerCase() +".gif") : "",
                countryflag3: (!!monthly[i+2].iso2) ? ("img/country/"+ monthly[i+2].iso2.toLowerCase() +".gif") : "",
                date: monthly[i].year + "-" + monthly[i].month,
                goldWinner: monthly[i].player,
                silverWinner: monthly[i+1].player,
                bronzeWinner: monthly[i+2].player
            }, {"append": true, "overwriteCache": true});
          }
          $("#tableMonthlyWinners").table("refresh");
        },
        error: function() {
          console.log("FAILED to load hall of fame!");
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
                            medals: getMedalsFor(p.additional),
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

    document.addEventListener("deviceready", function(event, ui) {
        if (cordova.platformId == 'android') {
          StatusBar.backgroundColorByHexString("#A70C0C");
        }
        $.mobile.defaultPageTransition = 'none';
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        var hallOfFameLoaded = false;

        $(document).bind("backbutton", function(){
            if (!$.mobile.activePage.is("#home")) {
                $.mobile.changePage('#home', {transition: 'none'});
            } else {
                navigator.notification.confirm('Do you really want to quit?',
                    function(button) {
                        if (button == 2) {
                            navigator.app.exitApp();
                        }
                    },
                    'NetPanzerSB',
                    'Cancel,Quit'
                );
            }
        });

        $(document).bind("pagebeforechange", function( event, data ) {
          if (data.toPage[0].id == "home") 
            if ($('#serverList').hasClass('ui-listview')) {
                $('#serverList').listview('refresh');
            } else {
                $('#serverList').trigger('create');
            }
          if (data.toPage[0].id == "hallOfFame") {
            if (!hallOfFameLoaded) loadHallOfFame();
          }
        });

        loadInfo();
        // loadHallOfFame();
        setInterval(function() {
            if (!$.mobile.activePage.is("#hallOfFame") && !($.mobile.activePage.is("#info"))) {
                $("#serverList").empty();
                loadInfo();
            }
        }, 30000);
    }, false);

});
