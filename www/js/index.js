var jqmReady = $.Deferred();
var pgReady = $.Deferred();
var app = {
    //Callback for when the app is ready
    callback: null,
    // Application Constructor
    initialize: function(callback) {
        this.callback = callback;
        var browser = document.URL.match(/^https?:/);
        if(browser) {
            // console.log("Is web.");
             //In case of web we ignore PG but resolve the Deferred Object to trigger initialization
            pgReady.resolve();
        } else {
          // console.log("Is not web.");
          this.bindEvents();
        }
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        // The scope of 'this' is the event, hence we need to use app.
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(event) {
        switch(event) {
        case 'deviceready':
            pgReady.resolve();
            break;
      }
   }
};

$(document).on("pageinit", function(event, ui) {
    jqmReady.resolve();
});

/**
 * General initialization.
 */
$.when(jqmReady, pgReady).then(function() {
    //Initialization code here
    if(app.callback) {
        app.callback();
    }

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

    $.mobile.defaultPageTransition = 'none';
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;

    loadInfo();
    setInterval(function() {
        if (!$.mobile.activePage.is("#shoutbox") && !($.mobile.activePage.is("#info"))) {
            // $.mobile.changePage('#home', {transition: 'none'}, function(){
            //     $("#serverList").empty();
            //     loadInfo();
            // });
            $("#serverList").empty();
            loadInfo();
        }
    }, 30000);
});

function loadInfo() {
    // var data = [{"gamename":"netpanzer","protocol":"1105","hostname":"Excalibur 215  ","gameversion":"0.8.5-test-1","mapname":"Two clans","mapcycle":"Two clans","password":"n","numplayers":"6","maxplayers":"12","gamestyle":"Time Limit","units_per_player":"32","time":"81","timelimit":"2000","fraglimit":"1000","objectivelimit":"7","players":[{"player":"Player391","kills":"209","deaths":"118","score":"2","points":"150","flag":"1","flagu":"2","playerseo":"player391","playerentitysafe":"Player391","strength":100,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/701bd2a1b2594ee373002360a5134e46.bmp"},{"player":"{UFC}MAQUINA DO MAL","kills":"25","deaths":"8","score":"0","points":"21","flag":"0","flagu":"9","playerseo":"ufcmaquina-do-mal","playerentitysafe":"{UFC}MAQUINA DO MAL","strength":14,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/d452182cf509cf1e51d3fe8396df71b8.bmp","additional":{"onlinetimes":"1701","kills":"429","losses":"112","points":"373","killsall":"6089","lossesall":"3472","pointsall":"3999","killerRate":"2:1","efficiency":"119","logstatus":"1","activityRate":"4","expertRate":"4","championsrate":"9.09","id":"85435","medals":{"gold":4,"silver":1,"bronze":0}}},{"player":"(TMP)NEW","kills":"12","deaths":"4","score":"1","points":"10","flag":"4","flagu":"8","playerseo":"tmpnew","playerentitysafe":"(TMP)NEW","strength":7,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/4437dd0f0ec5db86eadf4efc585c0bd9.bmp","additional":{"logstatus":"","onlinetimes":1780,"kills":12,"losses":4,"points":10,"killsall":1660,"lossesall":2003,"pointsall":632,"killerRate":"1:1","efficiency":0,"activityRate":4,"expertRate":0,"championsrate":"\u2013","id":"86982"}},{"player":"Hicham","kills":"2","deaths":"1","score":"2","points":"2","flag":"6","flagu":"5","playerseo":"hicham","playerentitysafe":"Hicham","strength":1,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/d5effd084db6cf8203585f10f52ce336.bmp","additional":{"logstatus":"","onlinetimes":2451,"kills":2,"losses":1,"points":2,"killsall":4943,"lossesall":3785,"pointsall":2933,"killerRate":"1:1","efficiency":67,"activityRate":4,"expertRate":4,"championsrate":"\u2013","id":"86788"}},{"player":"(S+G)BIEL16","kills":"0","deaths":"0","score":"0","points":"0","flag":"2","flagu":"8","playerseo":"sgbiel16","playerentitysafe":"(S+G)BIEL16","strength":0,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/1578c8188c7f1b776f83c544ef1d934a.bmp","additional":{"logstatus":"1","onlinetimes":3185,"kills":0,"losses":0,"points":0,"killsall":"6568","lossesall":"4231","pointsall":"4359","killerRate":"2:1","efficiency":87,"activityRate":5,"expertRate":4,"championsrate":8.66,"gameserver":"189.11.183.51:3030","id":"84876","medals":false}},{"player":"VODKA","kills":"81","deaths":"340","score":"1","points":"-89","flag":"3","flagu":"4","playerseo":"vodka","playerentitysafe":"VODKA","strength":0,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/04ea5ecf8f30839195d47e5f56df73eb.bmp"}],"denied":true,"host":"189.11.183.51","port":"3030","hostId":"18911183513030","hostcountrycode":"BR","hostcountryname":"Brazil","uptime":"1:21 h","gamestyleText":" max 33:20 h.","maxunits":384,"mapnameseo":"two-clans","playersingame":50,"quality":87.5,"spawns":"9","outposts":"9\n","difficulty":50},{"gamename":"netpanzer","protocol":"1105","hostname":"www.NETPANZER.info","gameversion":"0.8.5-test-1","mapname":"Two clans","mapcycle":"Two clans","password":"n","numplayers":"2","maxplayers":"12","gamestyle":"Frag Limit","units_per_player":"32","time":"2946","timelimit":"30","fraglimit":"1000","objectivelimit":"7","players":[{"player":"100%","kills":"0","deaths":"0","score":"0","points":"0","flag":"1","flagu":"142","playerseo":"100","playerentitysafe":"100%","strength":100,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/8cd61b8d2bd101800b6767bd509c67bc.bmp","additional":{"logstatus":"","onlinetimes":1628,"kills":0,"losses":0,"points":0,"killsall":"971","lossesall":"874","pointsall":"562","killerRate":"1:1","efficiency":0,"activityRate":4,"expertRate":2,"championsrate":"\u2013","id":"86802"}},{"player":"xeer","kills":"0","deaths":"0","score":"3","points":"0","flag":"0","flagu":"206","playerseo":"xeer","playerentitysafe":"xeer","strength":100,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/93766817d98346d6adc9be4d78856e7d.bmp","additional":{"logstatus":"","onlinetimes":5839,"kills":0,"losses":0,"points":0,"killsall":"4468","lossesall":"8233","pointsall":"758","killerRate":"1:2","efficiency":0,"activityRate":5,"expertRate":0,"championsrate":"\u2013","id":"86917"}}],"denied":false,"host":"82.211.56.174","port":"3030","hostId":"82211561743030","hostcountrycode":"DE","hostcountryname":"Germany","uptime":"49:6 h","gamestyleText":" need 1000 points to win","maxunits":384,"mapnameseo":"two-clans","playersingame":17,"quality":87.5,"spawns":"9","outposts":"9\n","difficulty":25},{"gamename":"netpanzer","protocol":"1105","hostname":"Niale","gameversion":"0.8.4","mapname":"The Valley","mapcycle":"The Valley","password":"n","numplayers":"2","maxplayers":"2","full":"1","gamestyle":"Objective","units_per_player":"5000","time":"59","timelimit":"330","fraglimit":"500","objectivelimit":"19","players":[{"player":"Tisho","kills":"0","deaths":"0","score":"9","points":"0","flag":"1","flagu":"5","playerseo":"tisho","playerentitysafe":"Tisho","strength":100,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/79bc53ca467df049e8f1e5a7aeb59350.bmp"},{"player":"Niale","kills":"0","deaths":"0","score":"8","points":"0","flag":"0","flagu":"9","playerseo":"niale","playerentitysafe":"Niale","strength":100,"flagfile":"\/public\/netpanzer.info\/data\/userflags\/ba116971ad23a96c8cc67cd1cc43c2fd.bmp"}],"denied":true,"host":"71.21.139.158","port":"3030","hostId":"71211391583030","hostcountrycode":"US","hostcountryname":"United States","uptime":"0:59 h","gamestyleText":" need 19 outposts to win","maxunits":10000,"mapnameseo":"the-valley","playersingame":100,"quality":0,"spawns":"19","outposts":"19\n","difficulty":0},{"gamename":"netpanzer","protocol":"1105","hostname":"<<<B.R.A.S.I.L>>> 12 different Skins","gameversion":"0.8.5-test-1","mapname":"Two clans (new_mod)","mapcycle":"Two clans (new_mod)","password":"n","numplayers":"0","maxplayers":"10","empty":"1","gamestyle":"Frag Limit","units_per_player":"32","time":"234","timelimit":"30","fraglimit":"750","objectivelimit":"7","denied":false,"host":"77.12.82.19","port":"3040","hostId":"771282193040","hostcountrycode":"DE","hostcountryname":"Germany","uptime":"3:54 h","gamestyleText":" need 750 points to win","maxunits":320,"mapnameseo":"two-clans-newmod","playersingame":0,"quality":87.5,"spawns":"9","outposts":"9\n","difficulty":0},{"gamename":"netpanzer","protocol":"1105","hostname":"Paris-Cannes","gameversion":"0.8.4","mapname":"Two Villages","mapcycle":"Battlefield, The Valley (mod),  Two Villages, Bad Neuburg","password":"n","numplayers":"0","maxplayers":"10","empty":"1","gamestyle":"Time Limit","units_per_player":"45","time":"239","timelimit":"500","fraglimit":"3300","objectivelimit":"7","denied":false,"host":"93.22.41.170","port":"3030","hostId":"9322411703030","hostcountrycode":"FR","hostcountryname":"France","uptime":"3:59 h","gamestyleText":" max 8:20 h.","maxunits":450,"mapnameseo":"two-villages","playersingame":0,"quality":75,"spawns":"14","outposts":"9\n","difficulty":0},{"gamename":"netpanzer","protocol":"1105","hostname":"Hyper Wars","gameversion":"0.8.5-test-1","mapname":"Two clans (new_mod)","mapcycle":"Two clans (new_mod)","password":"n","numplayers":"0","maxplayers":"10","empty":"1","gamestyle":"Frag Limit","units_per_player":"25","time":"1458","timelimit":"30","fraglimit":"900","objectivelimit":"7","denied":false,"host":"77.12.82.19","port":"3060","hostId":"771282193060","hostcountrycode":"DE","hostcountryname":"Germany","uptime":"24:18 h","gamestyleText":" need 900 points to win","maxunits":250,"mapnameseo":"two-clans-newmod","playersingame":0,"quality":100,"spawns":"9","outposts":"9\n","difficulty":0}];
    $.getJSON("http://www.netpanzer.info/public/serverbrowser.json.php", function(data) {
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
        $('#serverList').listview('refresh');
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
