    Array.prototype.isNull = function () { return this.join().replace(/,/g,'').length === 0; };

    //[null, null, null].isNull(); // true
    //[null, 3, null].isNull(); // false

    is_mobile = false;

    // jqXHR - https://api.jquery.com/jQuery.ajax/#jqXHR
    // ISS
    // http://iss.moex.com/iss/reference/28  - http://iss.moex.com/iss/index.json
    jqXHR_iss_index_json                                  = {};
      // no map needed - engines
      map_jqXHR_iss_index_json_markets_data               = new Map();  // + engine -> markets
      map_jqXHR_iss_index_json_boards_data                = new Map();  // + engine -> markets -> boardgroups -> boards
      map_jqXHR_iss_index_json_boardgroups_data           = new Map();  // + engine -> markets -> boardgroups
      // no map needed - durations
      map_jqXHR_iss_index_json_securitytypes_data         = new Map();  // + engine -> securitytypes
      map_jqXHR_iss_index_json_securitygroups_data        = new Map();  // + engine -> securitygroups
      map_jqXHR_iss_index_json_securitycollection_data    = new Map();  // + engine -> securitygroups -> securitycollection
    // http://iss.moex.com/iss/reference/24  - http://iss.moex.com/iss/turnovers.json
    jqXHR_iss_turnovers_json                              = {};
    // http://iss.moex.com/iss/reference/100 - http://iss.moex.com/iss/turnovers/columns
    jqXHR_iss_turnovers_columns_json                      = {};

    // *** securities
    // http://iss.moex.com/iss/reference/5   - http://iss.moex.com/iss/securities?limit=100&start=15600
    arr_pages_jqXHR_iss_securities_json                   = new Array();
      map_aggr_by_emitent_id_jqXHR_iss_securities         = null;
    // http://iss.moex.com/iss/reference/13  - http://iss.moex.com/iss/securities/AFKS
    map_secid_jqXHR_iss_securities_security_json          = new Map();  // secid -> security

    // *** engines
    // --- lev 1: /turnovers
    // http://iss.moex.com/iss/reference/95  - https://iss.moex.com/iss/engines/stock/turnovers
    //                                       - https://iss.moex.com/iss/engines/stock/turnovers/columns
    map_engine_jqXHR_iss_engines_turnovers_json                   = new Map();   // engine -> turnovers (engine -> turnoverssectors as well)
    // *** markets
    // --- lev 1: /markets/{id}
    // --- lev 2: /turnovers
    // http://iss.moex.com/iss/reference/96  - https://iss.moex.com/iss/engines/stock/markets/shares/turnovers
    // --- lev 2: /turnovers/columns
    //                                       - https://iss.moex.com/iss/engines/stock/markets/shares/turnovers/columns
    map_market_jqXHR_iss_engines_markets_turnovers_json           = new Map();   // market -> turnovers
    // *** boards
    // --- lev 2: /boards/{id}
    // --- lev 3: /securities
    // http://iss.moex.com/iss/reference/32  - https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities
    //                                       - https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/columns
    map_board_jqXHR_iss_engines_markets_boards_securities_json    = new Map();   // board -> securities
    // *** trades
    // --- lev 3: /trades
    // http://iss.moex.com/iss/reference/34  - https://iss.moex.com/iss/engines/stock/markets/ccp/boards/PSRP/trades
    //                                       - https://iss.moex.com/iss/engines/stock/markets/ccp/boards/PSRP/trades/columns
    map_board_jqXHR_iss_engines_markets_boards_trades_json        = new Map();   // board -> trades
      map_aggr_by_SECID_jqXHR_iss_engines_markets_boards_trades   = null;

    // Chart JS
    // https://www.chartjs.org/docs/latest/
    // https://chartjs-plugin-datalabels.netlify.app/guide/
    //
    // 1. For filling the chart with the image: 
    //    https://www.chartjs.org/docs/latest/general/colors.html 
    //    var img = new Image();
    //    img.src = '{% static "moex/icon2.ico/apple-icon-57x57.png" %}' 
    //    img.onload = function() { 
    //      var fillPattern = ctx.createPattern(img, 'repeat');
    //      ...
    //        // create chart here 
    //        backgroundColor: fillPattern
    //      ...
    //     }
    // 2. For color-blinded people: https://github.com/ashiguruma/patternomaly
    //    backgroundColor: pattern.generate(['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f',])
    // 3. For palette generation: https://learnui.design/tools/data-color-picker.html#divergent
    //    backgroundColor: ['#003f5c','#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600']
    //    #00876c : 
    //    backgroundColor: ['#00876c','#469972','#6fab79','#94bd83','#b8ce90','#dce0a0','#fff1b3','#f9d694','#f4bb7a','#ef9e66','#e88159','#e06152','#d43d51']
    //    backgroundColor: ['#00876c','#6fab79','#b8ce90','#fff1b3','#f4bb7a','#e88159','#d43d51'],
    // 4. Chart.js-master/samples/utils.js
    //    window.chartColors = {
    //      red: 'rgb(255, 99, 132)',
    //      orange: 'rgb(255, 159, 64)',
    //      yellow: 'rgb(255, 205, 86)',
    //      green: 'rgb(75, 192, 192)',
    //      blue: 'rgb(54, 162, 235)',
    //      purple: 'rgb(153, 102, 255)',
    //      grey: 'rgb(201, 203, 207)'
    //    };
    //    chartColors = window.chartColors;
    //    // chart.js/dist/Chart.js
    //    // @namespace Chart.helpers
    //    color = Chart.helpers.color;
    //    backgroundColor = [
    //      color(chartColors.blue).alpha(0.5).rgbString(),
    //      color(chartColors.green).alpha(0.5).rgbString(),
    //      color(chartColors.yellow).alpha(0.5).rgbString(),
    //      color(chartColors.orange).alpha(0.5).rgbString(),
    //      color(chartColors.red).alpha(0.5).rgbString(),
    //    ]

    // https://gka.github.io/chroma.js/
    // chroma-js/chroma.js:
    // ...
    // lightblue: '#add8e6',
    // lightcoral: '#f08080',
    // ...

    
    // !!!!!! HELPER : https://gka.github.io/palettes/
    // chroma.brewer.OrRd
    // !!!!!! Better HELPER : https://colorbrewer2.org/#type=diverging&scheme=RdYlBu&n=11
    // linear interpolation
    backgroundColor = [
      chroma.scale([
        chroma('steelblue').alpha(0.3), 
        chroma('gold').alpha(0.3), 
        chroma('red').alpha(0.3)
      ]).mode('lch').colors(5),

      // https://www.color-hex.com/color-palettes/popular.php

      // turnovers - engines
      // https://www.color-hex.com/color-palette/700  - Metro UI Colors Color Palette
      // https://gka.github.io/palettes/#/5|s|ff7d8d,5eea8c,69e6ff,ffad68,ffe34a|ffffe0,ff005e,93003a|0|1
      ['#ff7d8d', '#a3d2a9', '#69e6ff', '#ebca89', '#ffe34a'],
      // https://gka.github.io/palettes/#/10|s|ff7d8d,5eea8c,69e6ff,ffad68,ffe34a|ffffe0,ff005e,93003a|0|1
      ['#ff7d8d', '#d4af93', '#adcda3', '#89dec0', '#70e5e7', '#a2dbdf', '#d6cda9', '#efca80', '#fcd161', '#ffe34a'],

      // turnovers - markets
      // https://www.color-hex.com/color-palette/807  - Rainbow Dash Color Palette
      // https://gka.github.io/palettes/#/10|s|ee4035,f37736,fdf498,7bc043,0392cf|ffffe0,ff005e,93003a|0|1
      // ['#ee4035', '#f2603a', '#f78348', '#fcac60', '#feda83', '#e2e988', '#b3d27b', '#8dbb84', '#67a6a0', '#0392cf'],
      // https://gka.github.io/palettes/#/20|s|ee4035,f37736,fdf498,7bc043,0392cf|ffffe0,ff005e,93003a|0|1
      // ['#ee4035', '#f04f36', '#f25e39', '#f46f3f', '#f78046', '#f99250', '#fba55c', '#fdba6a', '#fed07a', '#fee78e', '#f0ef90', '#d7e483', '#c1d97c', '#adce7b', '#9ac47e', '#89b986', '#78af92', '#65a5a2', '#4b9bb6', '#0392cf'],
      // https://gka.github.io/palettes/#/20|s|ff6250,ffa35f,dcd47a,7bc043,0392cf|ffffe0,ff005e,93003a|0|1
      // ['#ff6250', '#ff7153', '#ff7f57', '#fd8c5a', '#fb995e', '#f8a563', '#f4b067', '#eebb6c', '#e8c572', '#e0cf77', '#d3d275', '#c1cd6e', '#b0c86c', '#a0c26f', '#92bb76', '#84b381', '#75ac8f', '#64a3a1', '#4b9bb6', '#0392cf'],

      // Mix of:
      // https://www.color-hex.com/color-palette/2017 - YouTube Color Palette
      // https://www.color-hex.com/color-palette/165  - Retro Color Palette
      // https://gka.github.io/palettes/#/10|s|ff5d4c,75c9ff,6aad21,b0929a,ffe28a|ffffe0,ff005e,93003a|0|0
      ['#ff5d4c', '#c28d9c', '#84bdeb', '#71c0b5', '#6db453', '#7aa73c', '#999b72', '#b99b98', '#dcbe91', '#ffe28a'],
      // https://gka.github.io/palettes/#/20|s|ff5d4c,75c9ff,6aad21,b0929a,ffe28a|ffffe0,ff005e,93003a|0|0
      ['#ff5d4c', '#e27472', '#c58a97', '#a8a1bd', '#8bb8e3', '#74c8f3', '#72c2c5', '#70bc96', '#6eb667', '#6cb039', '#72aa2e', '#81a547', '#8f9f61', '#9e997a', '#ad9394', '#bd9e97', '#cdaf94', '#dec091', '#eed18d', '#ffe28a'],


      // https://www.color-hex.com/color-palettes/popular.php
      // https://www.color-hex.com/color-palette/5361 - pastel colors of the rainbow Color Palette
      
      // https://www.color-hex.com/color-palettes/popular.php
      // https://www.color-hex.com/color-palette/895  - Beach Color Palette
      // ...
    ]

    // Common ID prefixes
    prefix_grid         = "grid-";        // Grid prefix: general
                                          // Charts:
    prefix_chart        = "chart-";       // prefix: General
    prefix_doughnut     = "doughnut-";    // prefix: Doughnut
    prefix_pie          = "pie-";         // prefix: Pie
    prefix_candlestick  = "candlestick-"  // prefix: Candlestick

                                      // Navigations:
    prefix_tab        = "tab-"        // Tab prefix
    prefix_collapse   = "collapse-"   // Collapse prefix
    prefix_accordion  = "accordion-"; // Accordion prefix
    prefix_card       = "card-";      // Card prefix: general 

                              // Tables:
    prefix_table = "table-";  // Table prefix

    // ISS related
    prefix_engine             = "engine-";              // prefix: market             (e.g. card-engine-{engine}                    )
    prefix_market             = "market-";              // prefix: market             (e.g. card-market-{market}                    )
    prefix_securitytype       = "securitytype-";        // prefix: securitytype       (e.g. card-securitytype-{securitytype}        )
    prefix_securitygroup      = "securitygroup-";       // prefix: securitygroup      (e.g. card-securitygroup-{securitygroup}      )
    prefix_securitycollection = "securitycollection-";  // prefix: securitycollection (e.g. card-securitygroup-{securitycollection} )
    prefix_boardgroup         = "boardgroup-";          // prefix: boardgroup         (e.g. card-boardgroup-{boardgroup}            )
    prefix_board              = "board-";               // prefix: boardgroup         (e.g. card-boardgroup-{boardgroup}            )
    prefix_iss                = "iss-";
    prefix_index              = "index-";
    prefix_security           = "security-";

    // Common ID postfixes
    // ISS related
    postfix_markets             = "-markets";
    postfix_securitytypes       = "-securitytypes";
    postfix_securitygroups      = "-securitygroups";
    postfix_securitycollections = "-securitycollections";
    postfix_boardgroups         = "-boardgroups";
    postfix_boards              = "-boards";
    postfix_turnovers           = "-turnovers";         // for tables and charts
    postfix_turnoverssectors    = "-turnoverssectors";  // for tables and charts
    postfix_trades              = "-trades";            // for tables and charts
    postfix_securities          = "-securities";        // for tables and charts
    postfix_description         = "-description";                
    // DataTables related
    postfix_DataTables_wrapper  = "_wrapper"            // DataTables: entire wrapper div ID      , goes with table ID: {table ID}+"_wrapper"
    postfix_DataTables_length   = "_length"             // DataTables: show records length div ID , goes with table ID: {table ID}+"_length"
    postfix_DataTables_filter   = "_filter"             // DataTables: search's <input> div ID    , goes with table ID: {table ID}+"_filter"

    // Common ID infixes
    infix_aggr                  = "-aggr-by-";          // for tables and charts
    infix_sort                  = "-sort-by-";          // for tables and charts
    infix_board                 = "-board-";
    infix_interval              = "-interval-";

    // Common Grid ID markers
    marker_row_home         = "home";       // Grid row marker: home
    marker_row_main         = "main";       // Grid row marker: main
    marker_row_info         = "info";       // Grid row marker: info
    marker_row_aggr         = "aggr";       // Grid row marker: aggregates
    marker_row_load         = "load";       // Grid row marker: load
    marker_row_download     = "download";   // Grid row marker: download
    marker_row_upload       = "upload";     // Grid row marker: upload
    marker_row_progress     = "progress";   // Grid row marker: progress
    marker_row_log          = "log";        // Grid row marker: log
    marker_col_left         = "left";       // Grid col marker: left
    marker_col_right        = "right";      // Grid col marker: right
    marker_col_entire       = "entire";     // Grid col marker: entire
    marker_col_spinner      = "spinner";    // Grid col marker: spinner

    // ISS related markers
    marker_row_turnovers    = "turnovers";    // Grid row marker: turnovers
    marker_row_trades       = "trades";       // Grid row marker: trades
    marker_row_securities   = "securities";   // Grid row marker: securities
    marker_row_security     = "security";     // Grid row marker: security
    // iss-security related
    marker_row_securities   = "securities";   // Grid row marker: securities
    marker_row_description  = "description";  // Grid row marker: description
    marker_row_boards       = "boards";       // Grid row marker: boards

    marker_table_securities = "securities";   // Table marker: securities
    marker_table_security   = "security";     // Table marker: security
    marker_td_id            = "id";           // Table td marker: id

    // Common map keys
    // iss-security related
    map_key_security_securities_iss   = "securities_iss";   // map_secid_jqXHR_iss_securities_security_json
    map_key_security_securities_board = "securities_board"; // map_secid_jqXHR_iss_securities_security_json
    map_key_security_marketdata       = "marketdata";       // map_secid_jqXHR_iss_securities_security_json
    map_key_security_description      = "description";      // map_secid_jqXHR_iss_securities_security_json
    map_key_security_boards           = "boards";           // map_secid_jqXHR_iss_securities_security_json
    map_key_security_candleborders    = "candleborders";    // map_secid_jqXHR_iss_securities_security_json
    map_key_security_candles          = "candles";          // map_secid_jqXHR_iss_securities_security_json

    map_key_board_securities_board          = "securities_board";         // map_board_jqXHR_iss_engines_markets_boards_securities_json
    map_key_board_marketdata                = "marketdata";               // map_board_jqXHR_iss_engines_markets_boards_securities_json
    map_key_board_columns_securities_board  = "columns_securities_board"; // map_board_jqXHR_iss_engines_markets_boards_securities_json
    map_key_board_columns_marketdata        = "columns_marketdata"; // map_board_jqXHR_iss_engines_markets_boards_securities_json

    // Common ES index prefixes
    esi_all_sec       = "all-sec"
    esi_all_boards    = "all-boards"
    esi_hist_market   = "hist-market"
    esi_list_market   = "list-market"

    // Common ES search sizes
    size_all_sec          = 30000;    // up to 30K of total securities
    size_all_inner_sec    = 10000;    // up to 10K of total inner securities for aggregations
    size_emitent_sec      = 3000;     // up to 3K of securities per emitent
    size_days_per_market  = 30000;    // expecting up to 30K days of trade in a single market
    size_secs_per_market  = 200000;   // expecting up to 200K securities traded in market during the whole history period
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/browser-builds.html
    client = new $.es.Client({
      hosts: '192.168.196.146:9200',
      //log: 'trace',
      log: 'error',
      requestTimeout: 120000,
      timeout: 90,
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html
      maxRetries: 1,
    });

    function get_multipage_iss_securities_security_board_candles (item, deferred, start = 0, limit = 0, total = 0) {//(cell, start, limit, total, stop, finalize) {
      // console.log(item);
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      var time_begin = new Date(item.begin.replace(/\s/, "T"));
      var time_end   = new Date(item.end.  replace(/\s/, "T"));

      // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
      function formatDate(d) {
          var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
          return [year, month, day].join('-');
      }
      // item: 
      // secid      
      // boardid    
      // interval   
      // begin     
      // end       
      var board       = get_iss_index_board_by_boardid(item.boardid);          //      board from: https://iss.moex.com/iss/index
      var engine      = get_iss_index_engine_by_id(board.engine_id);
      var market      = get_iss_index_market_by_id(board.market_id);
      var boardgroup  = get_iss_index_boardgroup_by_id(board.board_group_id);
      // sec_board            engine          market                boardgroup    board
      // 0: "secid"           // 0: "id"      id'                   id'           // 0: "id"
      // 1: "boardid"         // 1: "name"    name'                 name'         // 1: "board_group_id"
      // 2: "title"           // 2: "title"   title'                title'        // 2: "engine_id"
      // 3: "board_group_id"                  marketplace'          is_default'   // 3: "market_id"
      // 4: "market_id"                       // added 2020-05-27   is_traded'    // 4: "boardid"
      // 5: "market"                          trade_engine_id'                    // 5: "board_title"
      // 6: "engine_id"                       trade_engine_name'                  // 6: "is_traded"
      // 7: "engine"                          trade_engine_title'                 // 7: "has_candles"
      // 8: "is_traded"                                                           // 8: "is_primary"
      // 9: "decimals"            
      // 10: "history_from"            
      // 11: "history_till"          
      // 12: "listed_from"          
      // 13: "listed_till"          
      // 14: "is_primary"          
      // 15: "currencyid"          
      request = "https://iss.moex.com/iss" 
        + "/engines/"     + engine.name 
        + "/markets/"     + market.name
        + "/boards/"      + board.boardid
        + "/securities/"  + item.secid
        + "/candles.json"
        + "?"
        + "interval="     + item.interval
        + "&"
        + "from=" + formatDate(time_begin)
        + "&"
        + "till=" + formatDate(time_end)
        + "&"
        + "start=" + start;
      console.log("GET security " + item.secid + " candles for board " + board.boardid + ":" + request);
      jQuery.get(request).done( function( candles ) {
        //console.log(candles)

        if (candles.candles.data.length > 0) {
          var map = map_secid_jqXHR_iss_securities_security_json.get(item.secid);
          
          if (!map.has(map_key_security_candles)) {
            map.set(map_key_security_candles, new Map());
          }
          if(!map.get(map_key_security_candles).has(board.boardid)) {
            map.get(map_key_security_candles).set(board.boardid, new Map());
          }
          if(!map.get(map_key_security_candles).get(board.boardid).has(item.interval)) {
            map.get(map_key_security_candles).get(board.boardid).set(item.interval, new Array());
          }
          var arr = map.get(map_key_security_candles).get(board.boardid).get(item.interval);
          arr.push(candles);
          map.get(map_key_security_candles).get(board.boardid).set(item.interval, arr);
          map_secid_jqXHR_iss_securities_security_json.set(item.secid, map);
        }

        var c = candles.candles.data.length;
        total += c;

        // should be the last code in the function (?)
        if ( (c < limit) || ( (stop > 0) && (total >= stop) ) ) {
          // console.log("Done!")
          // mark the ajax call as completed
          deferred.resolve(candles);
        } else {
          // getting the next page until the last entry
          get_multipage_iss_securities_security_board_candles(item, deferred, start + c, c, total);
        }

      }).fail( function() {
        // mark the ajax call as failed
        deferred.reject(error);        
        // TODO: FINISH THIS PART
        alert ("ERROR: Request failed: " + request);
      });
      return deferred.promise();
    }
    // https://www.webniraj.com/2018/10/08/making-ajax-calls-sequentially-using-jquery/
    function get_iss_securities_security_board_candleborders(secid, sec_board) {
      var engine      = get_iss_index_engine_by_id(sec_board.engine_id);
      var market      = get_iss_index_market_by_id(sec_board.market_id);
      var boardgroup  = get_iss_index_boardgroup_by_id(sec_board.board_group_id);
      var board       = get_iss_index_board_by_boardid(sec_board.boardid);          //      board from: https://iss.moex.com/iss/index
      // sec_board            engine          market                boardgroup    board
      // 0: "secid"           // 0: "id"      id'                   id'           // 0: "id"
      // 1: "boardid"         // 1: "name"    name'                 name'         // 1: "board_group_id"
      // 2: "title"           // 2: "title"   title'                title'        // 2: "engine_id"
      // 3: "board_group_id"                  marketplace'          is_default'   // 3: "market_id"
      // 4: "market_id"                       // added 2020-05-27   is_traded'    // 4: "boardid"
      // 5: "market"                          trade_engine_id'                    // 5: "board_title"
      // 6: "engine_id"                       trade_engine_name'                  // 6: "is_traded"
      // 7: "engine"                          trade_engine_title'                 // 7: "has_candles"
      // 8: "is_traded"                                                           // 8: "is_primary"
      // 9: "decimals"            
      // 10: "history_from"            
      // 11: "history_till"          
      // 12: "listed_from"          
      // 13: "listed_till"          
      // 14: "is_primary"          
      // 15: "currencyid"          

      // /iss/engines/[engine]/markets/[market]/boards/[board]/securities/[security]/candleborders
      var request = "https://iss.moex.com/iss" 
        + "/engines/"     + engine.name 
        + "/markets/"     + market.name
        + "/boards/"      + board.boardid
        + "/securities/"  + secid
        + "/candleborders.json"
      console.log("GET security " + secid + " candleborders for board " + board.boardid + ": " + request);
      // https://www.webniraj.com/2018/10/08/making-ajax-calls-sequentially-using-jquery/
      var deferred = $.Deferred();
      jQuery.get(request).done( function( candleborders ) {
        // console.log(candleborders);
        if (candleborders.borders.data.length > 0) {
          var map = map_secid_jqXHR_iss_securities_security_json.get(secid);
          
          if (!map.has(map_key_security_candleborders)) {
            map.set(map_key_security_candleborders, new Map());
          }
          if(!map.get(map_key_security_candleborders).has(board.boardid)) {
            map.get(map_key_security_candleborders).set(board.boardid, candleborders)
          }
          map_secid_jqXHR_iss_securities_security_json.set(secid, map);
        }
        // mark the ajax call as completed
        deferred.resolve(candleborders);
      }).fail( function (error) {
        // mark the ajax call as failed
        deferred.reject(error);
        // TODO: FINISH THIS PART
        alert ("ERROR: Request failed: " + request);
      });
      return deferred.promise();
    };
    function get_multipage_iss_securities(cell, start, limit, total, stop, finalize) {
      var subrow    = grid_create_row(cell);                         // grid-securities-load-entire-{1...}
                      grid_create_col(subrow, "col-md-1 align-top"); // grid-securities-load-entire-{1...}-1
      var subcol_1  = grid_create_col(subrow, "col-md-3 align-top"); // grid-securities-load-entire-{1...}-2
      var subcol_2  = grid_create_col(subrow, "col-md-1 align-top"); // grid-securities-load-entire-{1...}-3
      var subcol_3  = grid_create_col(subrow, "col-md-1 align-top"); // grid-securities-load-entire-{1...}-4
      var subcol_4  = grid_create_col(subrow, "col-md-3 align-top"); // grid-securities-load-entire-{1...}-5
      var subcol_5  = grid_create_col(subrow, "col-md-1 align-top"); // grid-securities-load-entire-{1...}-5
                      grid_create_col(subrow, "col-md-2 align-top"); // grid-securities-load-entire-{1...}-6

      var request = "https://iss.moex.com/"
        + "iss/securities.json"
        + "?"
        + "is_trading=true"
        + "&"
        + "limit=" + limit.toString()
        + "&"
        + "start=" + start.toString();

      console.log("GET ALL securities: " + request);
      jQuery.get(request).done( function( securities ) {
        arr_pages_jqXHR_iss_securities_json.push(securities);

        var c = securities.securities.data.length;
        total += c;

        subcol_1.html("<font color='darkcyan'>" + request + "</font>"); // not really safe to pass the outer variable into the callback... buuut who cares...
        subcol_2.html("<font color='darkcyan'>Запрос " + arr_pages_jqXHR_iss_securities_json.length + "</font>");
        subcol_3.html("<font color='darkcyan'>Записей: " + c + "</font>");

        if (c > 0) {
          subcol_4.html("<font color='darkcyan'>Активы: <b>" 
            + securities.securities.data[0  ][securities.securities.columns.indexOf("secid")]
            + "</b> - <b>"
            + securities.securities.data[c-1][securities.securities.columns.indexOf("secid")]
            + "</b></font>");
        }

        subcol_5.html("<font color='darkcyan'>Всего: " + total + "</font>");

        // should be the last code in the function (?)
        if ( (c != limit) || ( (stop > 0) && (total >= stop) ) ) { 
          finalize();
        } else {
          // getting the next page until the last entry
          get_multipage_iss_securities(cell, start + c, limit, total, stop, finalize);
        }
      }).fail( function() {
        // TODO: FINISH THIS PART
        alert ("ERROR: Request failed: " + request);
      });
    }
    function get_iss_securities_security_board_candles(secid, description, finilize) {
      // https://www.webniraj.com/2018/10/08/making-ajax-calls-sequentially-using-jquery/
      // parameters for ajax calls
      var items = new Array();
      $.each(description.boards.data, function(i, board) {
        var sec_board = {
          'secid'         : board[description.boards.columns.indexOf("secid")],
          'boardid'       : board[description.boards.columns.indexOf("boardid")],
          'title'         : board[description.boards.columns.indexOf("title")],
          'board_group_id': board[description.boards.columns.indexOf("board_group_id")],
          'market_id'     : board[description.boards.columns.indexOf("market_id")],
          'market'        : board[description.boards.columns.indexOf("market")],
          'engine_id'     : board[description.boards.columns.indexOf("engine_id")],
          'engine'        : board[description.boards.columns.indexOf("engine")],
          'is_traded'     : board[description.boards.columns.indexOf("is_traded")],
          'decimals'      : board[description.boards.columns.indexOf("decimals")],
          'history_from'  : board[description.boards.columns.indexOf("history_from")],
          'history_till'  : board[description.boards.columns.indexOf("history_till")],
          'listed_from'   : board[description.boards.columns.indexOf("listed_from")],
          'listed_till'   : board[description.boards.columns.indexOf("listed_till")],
          'is_primary'    : board[description.boards.columns.indexOf("is_primary")],
          'currencyid'    : board[description.boards.columns.indexOf("currencyid")],
        }
        //if (sec_board.history_from && sec_board.history_from.trim() && sec_board.is_traded == 1) {
        if (sec_board.is_traded == 1) {
          //console_log_requests_security (secid, sec_board, false, false);
          items.push(sec_board);
        }
      })

      // https://www.webniraj.com/2018/10/08/making-ajax-calls-sequentially-using-jquery/
      // function to trigger the ajax call
      var looper = $.Deferred().resolve();
      // go through each item and call the ajax function
      $.when.apply($, $.map(items, function(item, i) {
        looper = looper.then(function() {
          // trigger ajax call with item data
          return get_iss_securities_security_board_candleborders(secid, item);
        });
        return looper;
      })).then(function() {
        // run this after all ajax calls have completed
        // console.log('Done!');
        var map = map_secid_jqXHR_iss_securities_security_json.get(secid);
        
        // https://www.webniraj.com/2018/10/08/making-ajax-calls-sequentially-using-jquery/
        // parameters for ajax calls
        var items = new Array();
        if (map.has(map_key_security_candleborders)) {
          map.get(map_key_security_candleborders).forEach(function(candleborders, boardid) {
            //console.log(boardid)
            //console.log(candleborders.borders.data)

            // candleborders.durations
            // interval (int32)   duration (int32)  days (int32)  title (string:765)  hint (string:765)
            // 1                  60                null          минута              1м
            // 10                 600               null          10 минут            10м
            // 60                 3600              null          час                 1ч
            // 24                 86400             null          день                1д
            // 7                  604800            null          неделя              1н
            // 31                 2678400           null          месяц               1М
            // 4                  8035200           null          квартал             1К
            $.each(candleborders.borders.data, function (i, candleborder) {
              if (24 == candleborder[candleborders.borders.columns.indexOf("interval")]) {
                items.push({ 
                  secid     : secid, 
                  boardid   : boardid, 
                  interval  : 24, 
                  begin     : candleborder[candleborders.borders.columns.indexOf("begin")],
                  end       : candleborder[candleborders.borders.columns.indexOf("end")]
                })
              }
            })
          })
        } else {
          console.log("WARNING: security " + secid + " got no candleborders for all boards");
          var markets = new Map();
          $.each(description.boards.data, function(i, board) {
            //if (sec_board.history_from && sec_board.history_from.trim() && sec_board.is_traded == 1) {
            if (!markets.has(board[description.boards.columns.indexOf("market")])) {
              markets.set(board[description.boards.columns.indexOf("market")], board);
            }
          })
          console.log("--- Try to check the markets level for security " + secid + " :");
          markets.forEach(function (board, market) {
            console.log("--- market " + board[description.boards.columns.indexOf("market")] + ": "
              + "https://iss.moex.com/iss" 
              + "/engines/"     + board[description.boards.columns.indexOf("engine")] 
              + "/markets/"     + board[description.boards.columns.indexOf("market")] 
              + "/securities/"  + secid
              + "/candleborders")
          })
          finilize();
          return;
        }

        // https://www.webniraj.com/2018/10/08/making-ajax-calls-sequentially-using-jquery/
        // function to trigger the ajax call
        var looper = $.Deferred().resolve();
        // go through each item and call the ajax function
        $.when.apply($, $.map(items, function(item, i) {
          looper = looper.then(function() {
            var deferred = $.Deferred();
            // trigger ajax call with item data
            return get_multipage_iss_securities_security_board_candles(item, deferred);
          });
          return looper;
        })).then(finilize);
      });
    }

    function process_iss_index_markets () {
      var columns = jqXHR_iss_index_json.markets.columns;
      var data = jqXHR_iss_index_json.markets.data;
      $.each( data, function( i, val ) {
        // columns: Array(8)
        // 0: "id"
        // 1: "trade_engine_id"
        // 2: "trade_engine_name"
        // 3: "trade_engine_title"
        // 4: "market_name"
        // 5: "market_title"
        // 6: "market_id"
        // 7: "marketplace"
        if ( !map_jqXHR_iss_index_json_markets_data.has(val[columns.indexOf("trade_engine_id")]) ) {
          map_jqXHR_iss_index_json_markets_data.set(val[columns.indexOf("trade_engine_id")], new Array());
        }
        map_jqXHR_iss_index_json_markets_data.get(val[columns.indexOf("trade_engine_id")]).push(val);
      });    
    }
    function process_iss_index_boardgroups () {
      var columns = jqXHR_iss_index_json.boardgroups.columns;
      var data = jqXHR_iss_index_json.boardgroups.data;
      $.each( data, function( i, val ) {
        // columns: Array(11)
        // 0: "id"
        // 1: "trade_engine_id"
        // 2: "trade_engine_name"
        // 3: "trade_engine_title"
        // 4: "market_id"
        // 5: "market_name"
        // 6: "name"
        // 7: "title"
        // 8: "is_default"
        // 9: "board_group_id"
        // 10: "is_traded"
        if ( !map_jqXHR_iss_index_json_boardgroups_data.has(val[columns.indexOf("trade_engine_id")]) ) {
          map_jqXHR_iss_index_json_boardgroups_data.set(val[columns.indexOf("trade_engine_id")], new Map());
        }
        if ( !map_jqXHR_iss_index_json_boardgroups_data
              .get(val[columns.indexOf("trade_engine_id")]) // assuming we have engine id entry at this point
              .has(val[columns.indexOf("market_id")]) ) {
          map_jqXHR_iss_index_json_boardgroups_data
            .get(val[columns.indexOf("trade_engine_id")])
            .set(val[columns.indexOf("market_id")], new Array());
        }
        map_jqXHR_iss_index_json_boardgroups_data
          .get(val[columns.indexOf("trade_engine_id")])
          .get(val[columns.indexOf("market_id")]).push(val);
      });    
    }
    function process_iss_index_boards () {
      var columns = jqXHR_iss_index_json.boards.columns;
      var data = jqXHR_iss_index_json.boards.data;
      $.each( data, function( i, val ) {
        // columns: Array(9)
        // 0: "id"
        // 1: "board_group_id"
        // 2: "engine_id"
        // 3: "market_id"
        // 4: "boardid"
        // 5: "board_title"
        // 6: "is_traded"
        // 7: "has_candles"
        // 8: "is_primary"
        if ( !map_jqXHR_iss_index_json_boards_data.has(val[columns.indexOf("engine_id")]) ) {
          map_jqXHR_iss_index_json_boards_data.set(val[columns.indexOf("engine_id")], new Map());
        }
        if ( !map_jqXHR_iss_index_json_boards_data
              .get(val[columns.indexOf("engine_id")]) // assuming we have engine id entry at this point
              .has(val[columns.indexOf("market_id")]) ) {
          map_jqXHR_iss_index_json_boards_data
            .get(val[columns.indexOf("engine_id")])
            .set(val[columns.indexOf("market_id")], new Map());
        }

        if ( !map_jqXHR_iss_index_json_boards_data
              .get(val[columns.indexOf("engine_id")]) // assuming we have engine id entry at this point
              .get(val[columns.indexOf("market_id")]) // assuming we have market id entry at this point
              .has(val[columns.indexOf("board_group_id")]) ) {
          map_jqXHR_iss_index_json_boards_data
            .get(val[columns.indexOf("engine_id")])
            .get(val[columns.indexOf("market_id")]) 
            .set(val[columns.indexOf("board_group_id")], new Array());
        }
        map_jqXHR_iss_index_json_boards_data
          .get(val[columns.indexOf("engine_id")])
          .get(val[columns.indexOf("market_id")])
          .get(val[columns.indexOf("board_group_id")]).push(val);
      });    
    }
    // map_jqXHR_iss_index_json_securitytypes_data : engine -> securitytypes
    function process_iss_index_securitytypes () {
      var columns = jqXHR_iss_index_json.securitytypes.columns;
      var data = jqXHR_iss_index_json.securitytypes.data;
      $.each( data, function( i, val ) {
        // 0: "id"
        // 1: "trade_engine_id"
        // 2: "trade_engine_name"
        // 3: "trade_engine_title"
        // 4: "security_type_name"
        // 5: "security_type_title"
        if ( !map_jqXHR_iss_index_json_securitytypes_data.has(val[columns.indexOf("trade_engine_id")]) ) {
          map_jqXHR_iss_index_json_securitytypes_data.set(val[columns.indexOf("trade_engine_id")], new Array());
        }
        map_jqXHR_iss_index_json_securitytypes_data.get(val[columns.indexOf("trade_engine_id")]).push(val);
      });    
    }
    // map_jqXHR_iss_index_json_securitygroups_data : engine -> securitygroups
    function process_iss_index_securitygroups () {
      var columns = jqXHR_iss_index_json.securitygroups.columns;
      var data = jqXHR_iss_index_json.securitygroups.data;
      $.each( data, function( i, val ) {
        // 0: "id"
        // 1: "name"
        // 2: "title"
        // 3: "is_hidden"
        var engine = val[columns.indexOf("name")].match(/\b([a-zA-Z]+)_/)[1];
        if ( !map_jqXHR_iss_index_json_securitygroups_data.has(engine) ) {
          map_jqXHR_iss_index_json_securitygroups_data.set(engine, new Array());
        }
        map_jqXHR_iss_index_json_securitygroups_data.get(engine).push(val);
      });    
    }
    // map_jqXHR_iss_index_json_securitycollection_data = new Map(); // engine -> securitygroups -> securitycollection
    function process_iss_index_securitycollections () {
      var columns = jqXHR_iss_index_json.securitycollections.columns;
      var data = jqXHR_iss_index_json.securitycollections.data;
      $.each( data, function( i, val ) {
        // 0: "id"
        // 1: "name"
        // 2: "title"
        // 3: "security_group_id"
        var engine = val[columns.indexOf("name")].match(/\b([a-zA-Z]+)_/)[1];
        if ( !map_jqXHR_iss_index_json_securitycollection_data.has(engine) ) {
          map_jqXHR_iss_index_json_securitycollection_data.set(engine, new Map());
        }
        if ( !map_jqXHR_iss_index_json_securitycollection_data
              .get(engine) // assuming we have engine id entry at this point
              .has(val[columns.indexOf("security_group_id")]) ) {
          map_jqXHR_iss_index_json_securitycollection_data
            .get(engine)
            .set(val[columns.indexOf("security_group_id")], new Array());
        }
        map_jqXHR_iss_index_json_securitycollection_data
          .get(engine)
          .get(val[columns.indexOf("security_group_id")]).push(val);
      });    
    }

    function chartjs_zoom_test(canvas){
      var timeFormat = 'MM/DD/YYYY HH:mm';
      var now = window.moment();
      var dragOptions = {
        animationDuration: 1000
      };

      function randomScalingFactor() {
        return Math.round(Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1));
      }

      function randomColorFactor() {
        return Math.round(Math.random() * 255);
      }

      function randomColor(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
      }

      function newDate(days) {
        var n = now.clone().add(days, 'd').toDate();
        console.log(n);
        return n
      }

      function newDateString(days) {
        return now.clone().add(days, 'd').format(timeFormat);
      }

      var config = {
        type: 'line',
        data: {
          labels: [newDate(0), newDate(1), newDate(2), newDate(3), newDate(4), newDate(5), newDate(6)], // Date Objects
          datasets: [{
            label: 'My First dataset',
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
            fill: false,
            borderDash: [5, 5],
          }, {
            label: 'My Second dataset',
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
          }, {
            label: 'Dataset with point data',
            data: [{
              x: newDateString(0),
              y: randomScalingFactor()
            }, {
              x: newDateString(5),
              y: randomScalingFactor()
            }, {
              x: newDateString(7),
              y: randomScalingFactor()
            }, {
              x: newDateString(15),
              y: randomScalingFactor()
            }],
            fill: false
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Chart.js Time Scale'
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                parser: timeFormat,
                // round: 'day'
                tooltipFormat: 'll HH:mm'
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              },
              ticks: {
                maxRotation: 0
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'value'
              }
            }]
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x'
              },
              zoom: {
                enabled: true,
                drag: false,
                mode: 'x',
                speed: 0.05
              }
            }
          }
        }
      };
      /*
      //console.log(config.data.labels);
      config.data.datasets.forEach(function(dataset) {
        dataset.borderColor = randomColor(0.4);
        dataset.backgroundColor = randomColor(0.5);
        dataset.pointBorderColor = randomColor(0.7);
        dataset.pointBackgroundColor = randomColor(0.5);
        dataset.pointBorderWidth = 1;
      });
*/

      var ctx = document.getElementById(canvas.attr("id")).getContext('2d');
      window.myLine = new Chart(ctx, config);
    }
    // https://www.chartjs.org/docs/latest/
    // https://chartjs-plugin-datalabels.netlify.app/guide/
    // https://github.com/chartjs/chartjs-chart-financial
    function chartjs_create_mixed_bar_line(canvas, info = null) {
      var ctx = document.getElementById(canvas.attr("id")).getContext('2d');
      chart_data = {
          datasets: info.datasets,
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: info.labels
      };

      var chart = new Chart(ctx, {
        type: 'bar',
        data: chart_data,
        options: {
          plugins: {
            datalabels: {
              display: false,
            },
            // this one is taken from : chartjs-plugin-zoom/samples
            zoom: {
              pan: {
                enabled: true,
                mode: 'x'
              },
              zoom: {
                enabled: true,
                mode: 'x',
                speed: 0.3,
                // Enable drag-to-zoom behavior
                drag: false,
              }
            }
          },
          scales: info.scales,
          title: info.title,
        }
      });
    }
    // https://www.chartjs.org/docs/latest/
    // https://chartjs-plugin-datalabels.netlify.app/guide/
    // https://github.com/chartjs/chartjs-chart-financial
    function chartjs_create_candlestick(canvas, info = null) {
      var ctx = document.getElementById(canvas.attr("id")).getContext('2d');
      chart_data = {
          datasets: info.datasets,
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: []
      };

      var chart = new Chart(ctx, {
        type: 'candlestick',
        data: chart_data,
        options: {
          plugins: {
            datalabels: {
              display: false,
            },
            // this one is taken from : chartjs-plugin-zoom/samples
            zoom: {
              pan: {
                enabled: true,
                mode: 'x'
              },
              zoom: {
                enabled: true,
                mode: 'xy',
                speed: 0.3,
                // Enable drag-to-zoom behavior
                drag: false,
              }
            }
          },
          // this one is taken from : chartjs-chart-financial-f0c37e1dc24923a02c7793df8a292921db4b46cb/docs/index.js
          scales: {
            x: {
              afterBuildTicks: function(scale) {
                const majorUnit = scale._majorUnit;
                const ticks = scale.ticks;
                const firstTick = ticks[0];
                let i, ilen, val, tick, currMajor, lastMajor;

                val = luxon.DateTime.fromMillis(ticks[0].value);
                if ((majorUnit === 'minute' && val.second === 0)
                    || (majorUnit === 'hour' && val.minute === 0)
                    || (majorUnit === 'day' && val.hour === 9)
                    || (majorUnit === 'month' && val.day <= 3 && val.weekday === 1)
                    || (majorUnit === 'year' && val.month === 0)) {
                  firstTick.major = true;
                } else {
                  firstTick.major = false;
                }
                lastMajor = val.get(majorUnit);

                for (i = 1, ilen = ticks.length; i < ilen; i++) {
                  tick = ticks[i];
                  val = luxon.DateTime.fromMillis(tick.value);
                  currMajor = val.get(majorUnit);
                  tick.major = currMajor !== lastMajor;
                  lastMajor = currMajor;
                }
                return ticks;
              }
            }
          },
        }
      });
    }
    // https://www.chartjs.org/docs/latest/
    // https://chartjs-plugin-datalabels.netlify.app/guide/
    function chartjs_create_doughnut(canvas, info) {
      var ctx = document.getElementById(canvas.attr("id")).getContext('2d');

      chart_data = {
          datasets: info.datasets,
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: info.labels
      };

      var chart = new Chart(ctx, {
        type:    'doughnut',
        data:    chart_data,
        options: {
          // GENERAL 
          // https://www.chartjs.org/docs/latest/general/

          // Responsive Charts
          // https://www.chartjs.org/docs/latest/general/responsive.html
          // Name                         Type      Default Description
          // responsive                   boolean   true    Resizes the chart canvas when its container does (important note...).
          // responsiveAnimationDuration  number    0       Duration in milliseconds it takes to animate to new size after a resize event.
          // maintainAspectRatio          boolean   true    Maintain the original canvas aspect ratio (width / height) when resizing.
          // aspectRatio                  number    2       Canvas aspect ratio (i.e. width / height, a value of 1 representing a square canvas). 
          //                                                Note that this option is ignored if the height is explicitly defined either as attribute or via the style.
          // onResize                     function  null    Called when a resize occurs. Gets passed two arguments: the chart instance and the new size.
          responsive: true,
          aspectRatio: 2,

          // CONFIGURATION 
          // https://www.chartjs.org/docs/latest/configuration/ 

          // layout:
          // https://www.chartjs.org/docs/latest/configuration/layout.html
          // Name     Type            Default   Description
          // padding  number|object   0         The padding to add inside the chart. more...
          //                                    If this value is a number, it is applied to all sides of the chart (left, top, right, bottom). 
          //                                    If this value is an object, the left property defines the left padding. 
          //                                    Similarly the right, top and bottom properties can also be specified.
          layout: {
            padding: {
              bottom: 10
            }
          },

          // legend:
          // https://www.chartjs.org/docs/latest/configuration/legend.html
          // Name           Type      Default     Description
          // display        boolean   true        Is the legend shown?
          // position       string    'top'       Position of the legend. more...
          //                                      Position of the legend. Options are:
          //                                      'top', 'left','bottom','right'
          // align          string    'center'    Alignment of the legend. more...
          //                                      Alignment of the legend. Options are:
          //                                      'start','center','end', Defaults to 'center' for unrecognized values.
          // fullWidth      boolean   true        Marks that this box should take the full width of the canvas (pushing down other boxes). 
          //                                      This is unlikely to need to be changed in day-to-day use.
          // onClick        function              A callback that is called when a click event is registered on a label item.
          // onHover        function              A callback that is called when a 'mousemove' event is registered on top of a label item.
          // onLeave        function              A callback that is called when a 'mousemove' event is registered outside of a previously hovered label item.
          // reverse        boolean   false       Legend will show datasets in reverse order.
          // labels         object                See the Legend Label Configuration section below.
          // rtl            boolean               true for rendering the legends from right to left.
          // textDirection  string    'canvas'    default        This will force the text direction `'rtl' 
          //                                      'ltr` on the canvas for rendering the legend, regardless of the css specified on the canvas
          // For vertical legend improvement see:
          // https://github.com/chartjs/Chart.js/issues/3236
          // https://stackoverflow.com/questions/39236420/how-align-the-legend-items-in-chart-js-2/42957884#42957884
          legend : {
            position: 'right',
            align: 'center',
            // labels:
            // Name             Type       Default    Description
            // boxWidth         number     40         Width of coloured box.
            // fontSize         number     12         Font size of text.
            // fontStyle        string     'normal'   Font style of text.
            // fontColor        Color             '#666'     Color of text.
            // fontFamily       string     "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"        Font family of legend text.
            // padding          number     10         Padding between rows of colored boxes.
            // generateLabels   function              Generates legend items for each thing in the legend. Default implementation returns the text + styling for the color box. See Legend Item for details.
            // filter        function  null                        Filters legend items out of the legend. Receives 2 parameters, a Legend Item and the chart data.
            // usePointStyle    boolean    false      Label style will match corresponding point style (size is based on the mimimum value between boxWidth and fontSize).
            labels: {
              boxWidth: 30,
              fontSize: 14,
              padding:  5
            }
          },
          // title:
          // https://www.chartjs.org/docs/latest/configuration/title.html
          // Name       Type            Default   Description
          // display    Boolean         false     is the title shown
          // position   String          'top'     Position of title. more...
          // fontSize   Number          12        Font size
          // fontFamily String          "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"        Font family for the title text.
          // fontColor  Color           '#666'    Font color
          // fontStyle  String          'bold'    Font style
          // padding    Number          10        Number of pixels to add above and below the title text.
          // lineHeight Number/String   1.2       Height of an individual line of text (see MDN)
          // text       String/String[] ''        Title text to display. If specified as an array, text is rendered on multiple lines.
          title: {
            display: true,
            fontSize: 16,
            text: info.title,
          },

          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    //console.log(tooltipItem);
                    //console.log(data);

                    var label = data.labels[tooltipItem.index] || '';
                    if (label) {
                        label += ': ';
                    }
                    label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 1000) / 1000;
                    label = label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                    return label;
                }
            }
          },

          plugins: {
            // SEE: https://chartjs-plugin-datalabels.netlify.app/guide/
            // SEE: for labeling: https://emn178.github.io/chartjs-plugin-labels/samples/demo/
            datalabels: {
              display: 'auto',
              offset: 4,
              backgroundColor: function(context) { return context.dataset.backgroundColor; },
              borderColor: 'white',
              borderRadius: 25,
              borderWidth: 2,
              color: 'black',/*
              display: function(context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                // return value > count * 1.5;
                // display all values for now
                return true;
              },*/
              font: { weight: 'bold' },
              formatter: Math.round
            }
          },
        }
      });
    }
    function array_2d_transpose (arr) {
      // TO READ: https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
      // TO READ: https://jsperf.com/transpose-2d-array
      transposed_array = arr[0].map(function(col, i){
        return arr.map(function(row){
          return row[i];
        });
      });
      return transposed_array;
    }
    function create_tab (id, name, selected=false) {
      var a =  $("<a/>",  {
                'class' : "nav-link" + (selected ? " active" : ""),
                   'id' : prefix_tab + id,
          'data-toggle' : "tab",
                 'href' : "#" + prefix_collapse + id,
                 'role' : "tab",
        'aria-controls' : prefix_collapse + id,
        'aria-selected' : (selected ? "true" : "false"),
                 'html' : name
      });

      var li = $("<li/>", {'class':"nav-item"});
      a.appendTo(li);
      a.on('show.bs.tab', process_event_show); // events
      return li;
    }
    function create_tab_content (id, name, selected=false) {
      var div = $("<div/>", {
                  'class' : "tab-pane fade" + (selected ? " show active" : ""),
                     'id' : prefix_collapse + id,
                   'role' : "tabpanel",
        'aria-labelledby' : prefix_tab + id, 
                   'html' : name
      })

      // Creating Grid Container
      // First clearing the entire card-body
      div.html("");
      // Creating the grid container for the card-body:
      $("<div/>", {'class' : "container-fluid", 'id' : prefix_grid + id}).appendTo(div);

      return div;
    }
    function create_card (id, title, cls) {
      var div_card        = $("<div/>",    {'class':"card"})
      var div_card_header = $("<div/>",    {
        'class' : "card-header",
           'id' : prefix_card + id
      })
      var h2              = $("<h2/>",     {'class':"mb-0"})
      var button          = $("<button/>", {
                'class' : "btn btn-link btn-block " + cls,
                 'type' : "button",
          'data-toggle' : "collapse",
          'data-target' : "#" + prefix_collapse + id,
        'aria-expanded' : "false",
        'aria-controls' : prefix_collapse + id,
                 'html' : title
      });
      button.appendTo(h2);
      grid_create_img_google(button, true, true);
      h2.appendTo(div_card_header);
      // removing 'data-parent':"#main-cards" so the accordion is not auto-collapsings
      // var div_collapse    = $("<div/>",    {'class':"collapse", 'id':"" + prefix_collapse + ""+id,'aria-labelledby':"main-card-"+id,'data-parent':"#main-cards"})
      var div_collapse    = $("<div/>", {
                  'class' : "collapse", 
                     'id' : prefix_collapse + id,
        'aria-labelledby' : prefix_card + id,
//            'data-parent' : "#" + prefix_accordion + "main" 
      })
      var div_card_body   = $("<div/>", {
        'class' : "card-body", 
         'html' : title
      });
      div_card_body.appendTo(div_collapse);
      div_card_header.appendTo(div_card);
      div_collapse.appendTo(div_card);

      // Creating Grid Container
      // First clearing the entire card-body
      div_card_body.html("");
      // Creating the grid container for the card-body:
      $("<div/>", {'class' : "container-fluid", 'id' : prefix_grid + id}).appendTo(div_card_body);

      return div_card;
    }

    function get_iss_security_description(secid) {
      if (!map_secid_jqXHR_iss_securities_security_json.has(secid)) {
        alert ("ERROR (get_iss_security_description): no data received for security: " + secid);
        return false;
      }
      if (!map_secid_jqXHR_iss_securities_security_json.get(secid).has(map_key_security_description)) {
        alert ("ERROR (get_iss_security_description): no description data received for security: " + secid);
        return false;
      }
      var lines = map_secid_jqXHR_iss_securities_security_json.get(secid).get(map_key_security_description);

      var description = new Map();
      $.each(lines.data, function( i, line ) {
        description.set(line[lines.columns.indexOf("name")], line[lines.columns.indexOf("value")]);
      });
      return description
    }
    function get_iss_security_primary_board(secid) {
      if (!map_secid_jqXHR_iss_securities_security_json.has(secid)) {
        alert ("ERROR (get_iss_security_primary_board): no data received for security: " + secid);
        return false;
      }
      if (!map_secid_jqXHR_iss_securities_security_json.get(secid).has(map_key_security_boards)) {
        alert ("ERROR (get_iss_security_primary_board): no boards data received for security: " + secid);
        return false;
      }
      var boards = map_secid_jqXHR_iss_securities_security_json.get(secid).get(map_key_security_boards);
      // 0: "secid"
      // 1: "boardid"
      // 2: "title"
      // 3: "board_group_id"
      // 4: "market_id"
      // 5: "market"
      // 6: "engine_id"
      // 7: "engine"
      // 8: "is_traded"
      // 9: "decimals"
      // 10: "history_from"
      // 11: "history_till"
      // 12: "listed_from"
      // 13: "listed_till"
      // 14: "is_primary"
      // 15: "currencyid"
      var primary = null;

      $.each(boards.data, function( i, board ) {
        if (1 == board[boards.columns.indexOf("is_primary")]) {
          primary = {
            'secid'         : board[boards.columns.indexOf("secid")],
            'boardid'       : board[boards.columns.indexOf("boardid")],
            'title'         : board[boards.columns.indexOf("title")],
            'board_group_id': board[boards.columns.indexOf("board_group_id")],
            'market_id'     : board[boards.columns.indexOf("market_id")],
            'market'        : board[boards.columns.indexOf("market")],
            'engine_id'     : board[boards.columns.indexOf("engine_id")],
            'engine'        : board[boards.columns.indexOf("engine")],
            'is_traded'     : board[boards.columns.indexOf("is_traded")],
            'decimals'      : board[boards.columns.indexOf("decimals")],
            'history_from'  : board[boards.columns.indexOf("history_from")],
            'history_till'  : board[boards.columns.indexOf("history_till")],
            'listed_from'   : board[boards.columns.indexOf("listed_from")],
            'listed_till'   : board[boards.columns.indexOf("listed_till")],
            'is_primary'    : board[boards.columns.indexOf("is_primary")],
            'currencyid'    : board[boards.columns.indexOf("currencyid")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return primary
    }
    function get_iss_index_engine_by_name (name) {
      var engine = null;
      $.each(jqXHR_iss_index_json.engines.data, function( i, val ) {
        if (name == val[jqXHR_iss_index_json.engines.columns.indexOf("name")]) {
          engine = {
            'id'    : val[jqXHR_iss_index_json.engines.columns.indexOf("id")],
            'name'  : val[jqXHR_iss_index_json.engines.columns.indexOf("name")],
            'title' : val[jqXHR_iss_index_json.engines.columns.indexOf("title")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return engine
    }
    function get_iss_index_engine_by_id (id) {
      var engine = null;
      // columns: Array(3)
      // 0: "id"
      // 1: "name"
      // 2: "title"
      $.each(jqXHR_iss_index_json.engines.data, function( i, val ) {
        if (id == val[jqXHR_iss_index_json.engines.columns.indexOf("id")]) {
          engine = {
            'id'    : val[jqXHR_iss_index_json.engines.columns.indexOf("id")],
            'name'  : val[jqXHR_iss_index_json.engines.columns.indexOf("name")],
            'title' : val[jqXHR_iss_index_json.engines.columns.indexOf("title")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return engine
    }
    function get_iss_index_market_by_id (id) {
      // columns: Array(8)
      // 0: "id"
      // 1: "trade_engine_id"
      // 2: "trade_engine_name"
      // 3: "trade_engine_title"
      // 4: "market_name"
      // 5: "market_title"
      // 6: "market_id"
      // 7: "marketplace"
      var market = null;
      $.each(jqXHR_iss_index_json.markets.data, function( i, val ) {
        if (id == val[jqXHR_iss_index_json.markets.columns.indexOf("id")]) {
          market = {
            'id'          : val[jqXHR_iss_index_json.markets.columns.indexOf("market_id")],
            'name'        : val[jqXHR_iss_index_json.markets.columns.indexOf("market_name")],
            'title'       : val[jqXHR_iss_index_json.markets.columns.indexOf("market_title")],
            'marketplace' : val[jqXHR_iss_index_json.markets.columns.indexOf("marketplace")],
            // added 2020-05-27
            'trade_engine_id'    : val[jqXHR_iss_index_json.markets.columns.indexOf("trade_engine_id")],
            'trade_engine_name'  : val[jqXHR_iss_index_json.markets.columns.indexOf("trade_engine_name")],
            'trade_engine_title' : val[jqXHR_iss_index_json.markets.columns.indexOf("trade_engine_title")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return market;
    }
    function get_iss_index_boardgroup_by_id (id) {
      // columns: Array(11)
      // 0: "id"
      // 1: "trade_engine_id"
      // 2: "trade_engine_name"
      // 3: "trade_engine_title"
      // 4: "market_id"
      // 5: "market_name"
      // 6: "name"
      // 7: "title"
      // 8: "is_default"
      // 9: "board_group_id"
      // 10: "is_traded"
      var boardgroup = null;
      $.each(jqXHR_iss_index_json.boardgroups.data, function( i, val ) {
        if (id == val[jqXHR_iss_index_json.boardgroups.columns.indexOf("id")]) {
          boardgroup = {
            'id'          : val[jqXHR_iss_index_json.boardgroups.columns.indexOf("board_group_id")],
            'name'        : val[jqXHR_iss_index_json.boardgroups.columns.indexOf("name")],
            'title'       : val[jqXHR_iss_index_json.boardgroups.columns.indexOf("title")],
            'is_default'  : val[jqXHR_iss_index_json.boardgroups.columns.indexOf("is_default")],
            'is_traded'   : val[jqXHR_iss_index_json.boardgroups.columns.indexOf("is_traded")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return boardgroup;
    }
    function get_iss_index_board_by_boardid (boardid) {
    // columns: Array(9)
    // 0: "id"
    // 1: "board_group_id"
    // 2: "engine_id"
    // 3: "market_id"
    // 4: "boardid"
    // 5: "board_title"
    // 6: "is_traded"
    // 7: "has_candles"
    // 8: "is_primary"

      var board = null;
      $.each(jqXHR_iss_index_json.boards.data, function( i, val ) {
        if (boardid == val[jqXHR_iss_index_json.boards.columns.indexOf("boardid")]) {
          board = {
            "id"              : val[jqXHR_iss_index_json.boards.columns.indexOf("id")],
            "board_group_id"  : val[jqXHR_iss_index_json.boards.columns.indexOf("board_group_id")],
            "engine_id"       : val[jqXHR_iss_index_json.boards.columns.indexOf("engine_id")],
            "market_id"       : val[jqXHR_iss_index_json.boards.columns.indexOf("market_id")],
            "boardid"         : val[jqXHR_iss_index_json.boards.columns.indexOf("boardid")],
            "board_title"     : val[jqXHR_iss_index_json.boards.columns.indexOf("board_title")],
            "is_traded"       : val[jqXHR_iss_index_json.boards.columns.indexOf("is_traded")],
            "has_candles"     : val[jqXHR_iss_index_json.boards.columns.indexOf("has_candles")],
            "is_primary"      : val[jqXHR_iss_index_json.boards.columns.indexOf("is_primary")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return board;
    }
    function get_iss_index_board_by_id (id) {
    // columns: Array(9)
    // 0: "id"
    // 1: "board_group_id"
    // 2: "engine_id"
    // 3: "market_id"
    // 4: "boardid"
    // 5: "board_title"
    // 6: "is_traded"
    // 7: "has_candles"
    // 8: "is_primary"

      var board = null;
      $.each(jqXHR_iss_index_json.boards.data, function( i, val ) {
        if (id == val[jqXHR_iss_index_json.boards.columns.indexOf("id")]) {
          board = {
            "id"              : val[jqXHR_iss_index_json.boards.columns.indexOf("id")],
            "board_group_id"  : val[jqXHR_iss_index_json.boards.columns.indexOf("board_group_id")],
            "engine_id"       : val[jqXHR_iss_index_json.boards.columns.indexOf("engine_id")],
            "market_id"       : val[jqXHR_iss_index_json.boards.columns.indexOf("market_id")],
            "boardid"         : val[jqXHR_iss_index_json.boards.columns.indexOf("boardid")],
            "board_title"     : val[jqXHR_iss_index_json.boards.columns.indexOf("board_title")],
            "is_traded"       : val[jqXHR_iss_index_json.boards.columns.indexOf("is_traded")],
            "has_candles"     : val[jqXHR_iss_index_json.boards.columns.indexOf("has_candles")],
            "is_primary"      : val[jqXHR_iss_index_json.boards.columns.indexOf("is_primary")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return board;
    }
    function get_iss_index_securitytype_by_name (name) {
      // 0: "id"
      // 1: "trade_engine_id"
      // 2: "trade_engine_name"
      // 3: "trade_engine_title"
      // 4: "security_type_name"
      // 5: "security_type_title"
      var securitytype = null;
      $.each(jqXHR_iss_index_json.securitytypes.data, function( i, val ) {
        if (name == val[jqXHR_iss_index_json.securitytypes.columns.indexOf("security_type_name")]) {
          securitytype = {
            "id"                  : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("id")],
            "trade_engine_id"     : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("trade_engine_id")],
            "trade_engine_name"   : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("trade_engine_name")],
            "security_type_name"  : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("security_type_name")],
            "security_type_title" : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("security_type_title")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return securitytype;
    }
    function get_iss_index_securitytype_by_id (id) {
      // 0: "id"
      // 1: "trade_engine_id"
      // 2: "trade_engine_name"
      // 3: "trade_engine_title"
      // 4: "security_type_name"
      // 5: "security_type_title"
      var securitytype = null;
      $.each(jqXHR_iss_index_json.securitytypes.data, function( i, val ) {
        if (id == val[jqXHR_iss_index_json.securitytypes.columns.indexOf("id")]) {
          securitytype = {
            "id"                  : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("id")],
            "trade_engine_id"     : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("trade_engine_id")],
            "trade_engine_name"   : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("trade_engine_name")],
            "security_type_name"  : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("security_type_name")],
            "security_type_title" : val[jqXHR_iss_index_json.securitytypes.columns.indexOf("security_type_title")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return securitytype;
    }
    function get_iss_index_securitygroup_by_name (name) {
      // 0: "id"
      // 1: "name"
      // 2: "title"
      // 3: "is_hidden"
      var securitygroup = null;
      $.each(jqXHR_iss_index_json.securitygroups.data, function( i, val ) {
        if (name == val[jqXHR_iss_index_json.securitygroups.columns.indexOf("name")]) {
          securitygroup = {
            "id"        : val[jqXHR_iss_index_json.securitygroups.columns.indexOf("id")],
            "name"      : val[jqXHR_iss_index_json.securitygroups.columns.indexOf("name")],
            "title"     : val[jqXHR_iss_index_json.securitygroups.columns.indexOf("title")],
            "is_hidden" : val[jqXHR_iss_index_json.securitygroups.columns.indexOf("is_hidden")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return securitygroup;
    }
    function get_iss_index_securitygroup_by_id (id) {
      // 0: "id"
      // 1: "name"
      // 2: "title"
      // 3: "is_hidden"
      var securitygroup = null;
      $.each(jqXHR_iss_index_json.securitygroups.data, function( i, val ) {
        if (id == val[jqXHR_iss_index_json.securitygroups.columns.indexOf("id")]) {
          securitygroup = {
            "id"        : val[jqXHR_iss_index_json.securitygroups.columns.indexOf("id")],
            "name"      : val[jqXHR_iss_index_json.securitygroups.columns.indexOf("name")],
            "title"     : val[jqXHR_iss_index_json.securitygroups.columns.indexOf("title")],
            "is_hidden" : val[jqXHR_iss_index_json.securitygroups.columns.indexOf("is_hidden")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return securitygroup;
    }
    function get_iss_index_securitycollection_by_id (id) {
      // columns: Array(4)
      // 0: "id"
      // 1: "name"
      // 2: "title"
      // 3: "security_group_id"

      var securitycollection = null;
      $.each(jqXHR_iss_index_json.securitycollections.data, function( i, val ) {
        if (id == val[jqXHR_iss_index_json.securitycollections.columns.indexOf("id")]) {
          securitycollection = {
            "id"                : val[jqXHR_iss_index_json.securitycollections.columns.indexOf("id")],
            "name"              : val[jqXHR_iss_index_json.securitycollections.columns.indexOf("name")],
            "title"             : val[jqXHR_iss_index_json.securitycollections.columns.indexOf("title")],
            "security_group_id" : val[jqXHR_iss_index_json.securitycollections.columns.indexOf("security_group_id")],
          }
          return false; // false - break; true - continue;
        } 
      });
      return securitycollection;
    }
    function grid_create_progress(cell, valuenow, valuemin, valuemax, html = "Загрузка...") {
      // https://getbootstrap.com/docs/4.0/components/progress/
      var progress = $("<div/>", {class : "progress-bar progress-bar-striped progress-bar-animated", role : "progressbar", 
        style : "width: 0%", 
        'aria-valuenow' : valuenow, 
        'aria-valuemin' : valuemin, 
        'aria-valuemax' : valuemax,
      })
      var div = $("<div/>", {html : html});
      div.appendTo(cell);

      var div = $("<div/>", {class : "progress"});
      progress.appendTo(div)
      div.appendTo(cell);
      return progress;
    }
    function grid_create_spinner(cell = null, message = "Загрузка...") {
      // https://getbootstrap.com/docs/4.4/components/spinners/
      var div     = $("<div/>",    {'class' : "d-flex align-items-center justify-content-center"});
      var divider = $("<div/>",    {'class' : "divider"});
      var spinner = $("<div/>",    {'class' : "spinner-grow text-info", 'role' : "status", 'aria-hidden' : "true"});
      var strong  = $("<strong/>", {'html'  : "<font color='darkcyan'>" + message + "</font>"});
      spinner.appendTo(div);        
      divider.appendTo(div);
      strong.appendTo(div);
      if (cell) { div.appendTo(cell); }
      return div;
    }
    function grid_create_canvas(id, cell, row = null, col = null) {
      // default row laytout
      if (row == null) {
        row = grid_create_row(cell);
      }
      if (col == null) {
        col = grid_create_col(row, "col-md-12 align-top");
      }

      var canvas_id = prefix_chart + id;
      var canvas    = $("<canvas/>", {'id':canvas_id})
      canvas.appendTo(col);
      return { 'canvas' : canvas, 'cell' : col };
    }
    function grid_create_table(id, cell, row = null, col = null) {
      // default row laytout
      if (row == null) {
        row = grid_create_row(cell);
      }
      if (col == null) {
        col = grid_create_col(row, "col-md-12 align-top");
      }

      var table_id = prefix_table + id;
      var table    = $("<table/>", {'id':table_id, 'class':"table table-sm table-hover"});
      return { 'table' : table, 'cell' : col };
    }
    function grid_create_row (grid, marker = null) {
      var row = $("<div/>", {
        'class' : "row no-gutters", 
           'id' : grid.attr('id') + "-" + (marker ? marker : (grid.find(".row").length + 1))
      });
      row.appendTo(grid);
      return row;
    }
    function grid_create_col (row, cls, marker = null) {
      var col = $("<div/>", {
        'class' : cls + " grid-column",  
           'id' : row.attr('id') + "-" + (marker ? marker : (row.find(".grid-column").length + 1))
      });
      col.appendTo(row);
      return col;
    }
    // hiding columns
    function table_hide_columns(table, tohide, adjust = false) {
      // header
      $.each(tohide, function (i, v) {
        if (v >= 0) {$($($(table.table).find("tr")[0]).find("th")[v]).css("display", "none")};  // hiding v col cell from header
      });

      // body
      $(table.table).find("tr").each( function (i, tr) {
        $.each(tohide, function (i, v) {
          if (v >= 0) {$($(tr).find("td")[v]).css("display", "none");}                          // hiding v col cell from body
        });
      })

      if (adjust) {
        // https://stackoverflow.com/questions/40309580/jquery-datatable-fit-column-width-to-content
        // https://datatables.net/reference/api/columns.adjust()
        // adjusting the column width
        table.table.DataTable().columns.adjust();
      }
    }
    function table_select (table, cell, data, index, postfix, title) {
      var div    = $("<div/>",    {'class' : "dataTables_filter", id : table.table.attr("id") + postfix})
      var label  = $("<label/>",  {'html' : title})
      var select = $("<select/>", {'name' : table.table.attr("id") + postfix, 'aria-controls' : table.table.attr("id") })
      select.css('border-style', 'dashed');
      select.css('min-height', $("#" + table.table.attr("id") + postfix_DataTables_filter).find("input").outerHeight())
      select.css('max-height', $("#" + table.table.attr("id") + postfix_DataTables_filter).find("input").outerHeight())

      var option = $("<option/>", {'value' : "", 'html' : ""}) // first - empty option
      option.appendTo(select);
      $.each(data, function( i, val ) {
        var text = val[index]
        option = $("<option/>", {'value' : text, 'html' : text}) 
        option.appendTo(select);
      });
      select.appendTo(label);
      label .appendTo(div);
      $("<div/>", { 'class' : "divider" }).appendTo(div);

      // https://api.jquery.com/after/
      cell.after(div)
      
      // https://cdn.datatables.net/1.10.21/js/jquery.dataTables.js
      // see line 4221:
      // var jqFilter = $('input', filter)
      //   ...
      //   .on(
      //     'keyup.DT search.DT input.DT paste.DT cut.DT',
      //     searchDelay ?
      //       _fnThrottle( searchFn, searchDelay ) :
      //       searchFn
      //   )
      //   .on( 'mouseup', function(e) {
      //     // Edge fix! Edge 17 does not trigger anything other than mouse events when clicking
      //     // on the clear icon (Edge bug 17584515). This is safe in other browsers as `searchFn`
      //     // checks the value to see if it has changed. In other browsers it won't have.
      //     setTimeout( function () {
      //       searchFn.call(jqFilter[0]);
      //     }, 10);
      //   } )
      //   ...
      //
      // So the following is the sequence to trigger search:
      // $("#" + table.table.attr("id") + postfix_DataTables_filter).find("input").val("qwe")
      // $("#" + table.table.attr("id") + postfix_DataTables_filter).find("input").mouseup()

      select.change( function (event) {
        //console.log($(this).val());
        $("#" + table.table.attr("id") + postfix_DataTables_filter).find("input").val($(this).val())
        $("#" + table.table.attr("id") + postfix_DataTables_filter).find("input").mouseup()
      })
    }
    function table_th(html, align = 'center', id = null) {
      var th = $("<th/>", {
        'class' : "text-" + align,
        'scope' : "col", 
        'html'  : html, 
        'id'    : id
      });
      grid_create_img_google(th, true);
      return th;
    }
    function table_tr(head, data, google = false) {
      var tr = $("<tr/>")
      if (head) {
        var th = $("<th/>", {'class':"text-right",'scope':"row", 'html': head}).appendTo(tr);
        grid_create_img_google(th, true);
      }
      if (data) {
        $.each( data, function( i, val ) { 
          var td = $("<td/>", {
            'class':"text-left",
            'html': val.data,
              'id': val.id,
          });
          td.appendTo(tr); 
          if (google) { grid_create_img_google(td, true); }
        });
      }
      return tr;
    }
    function datatable_enable (table, datatable_conf, data = null) {
      // console.log(data);
      // https://mdbootstrap.com/docs/jquery/tables/basic/
      table.DataTable({
        // https://stackoverflow.com/questions/40309580/jquery-datatable-fit-column-width-to-content
        // https://datatables.net/reference/option/autoWidth
        "autoWidth": true,
        // https://datatables.net/examples/data_sources/js_array
        "data"    : data ? data.data    : null,
        "columns" : data ? data.columns : null,
        // https://mdbootstrap.com/docs/jquery/tables/sort/
        "aaSorting": [],
        "columnDefs": [{
          "orderable": false,
          "targets":   datatable_conf.sort.orderable_false
        },{
          "targets": datatable_conf.sort.visible_false,
          "visible": false,
          "searchable": false
        }],
        "order":     datatable_conf.sort.order,
        "ordering":  datatable_conf.sort.ordering,     // false to disable sorting (or any other option)
        // https://mdbootstrap.com/docs/jquery/tables/pagination/
        "paging":    datatable_conf.pagination.paging, // false to disable pagination (or any other option)
        // https://mdbootstrap.com/docs/jquery/tables/search/
        "searching": datatable_conf.search.searching,  // false to disable search (or any other option)
        // https://datatables.net/examples/advanced_init/length_menu.html
        "lengthMenu": datatable_conf.lengthMenu ? datatable_conf.lengthMenu : [[10, 25, 50, 100], [10, 25, 50, 100]],
        // https://datatables.net/manual/i18n
        // https://datatables.net/plug-ins/i18n/Russian
        "language" : {
          "processing": "Подождите...",
          "search": "Поиск:",
          "lengthMenu": "Показать _MENU_ записей",
          "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
          "infoEmpty": "Записи с 0 до 0 из 0 записей",
          "infoFiltered": "(отфильтровано из _MAX_ записей)",
          "infoPostFix": "",
          "loadingRecords": "Загрузка записей...",
          "zeroRecords": "Записи отсутствуют.",
          "emptyTable": "В таблице отсутствуют данные",
          "paginate": {
            "first": "Первая",
            "previous": "Предыдущая",
            "next": "Следующая",
            "last": "Последняя"
          },
          "aria": {
            "sortAscending": ": активировать для сортировки столбца по возрастанию",
            "sortDescending": ": активировать для сортировки столбца по убыванию"
          },
          "select": {
            "rows": {
              "_": "Выбрано записей: %d",
              "0": "Кликните по записи для выбора",
              "1": "Выбрана одна запись"
            }
          }
        }
      });
      $('.dataTables_length').addClass('bs-select');
    }
    // Format Big Number - FBN
    function fbn(x, units = null) {
      if (x > 1000000) {
        return ((Math.round(x/1000) / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + (units ? units[2] : ''));
      } else if (x > 1000) {
        return ((Math.round(x) / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + (units ? units[1] : ''));
      } else {
        return ((Math.round(x * 1000) / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + (units ? units[0] : ''));
      }
    }


    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search
    // Documentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html
    // Code Example:  https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/search_examples.html
    async function es_search (query) {
      console.log("(" + arguments.callee.name + ") query: ");
      console.log(query);
      // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search-api-query-params
      // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-api-response-body
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search
      const response = await client.search(query)
      //client.search({
        //index: string | string[],
        //type: string | string[],
        //analyzer: string,
        //analyze_wildcard: boolean,
        //ccs_minimize_roundtrips: boolean,
        //default_operator: 'AND' | 'OR',
        //df: string,
        //explain: boolean,
        //stored_fields: string | string[],
        //docvalue_fields: string | string[],
        //from: number,
        //ignore_unavailable: boolean,
        //ignore_throttled: boolean,
        //allow_no_indices: boolean,
        //expand_wildcards: 'open' | 'closed' | 'hidden' | 'none' | 'all',
        //lenient: boolean,
        //preference: string,
        //q: string,
        //routing: string | string[],
        //scroll: string,
        //search_type: 'query_then_fetch' | 'dfs_query_then_fetch',
        //size: number, // - Number of hits to return (default: 10)
        //sort: string | string[],
        //_source: string | string[],
        //_source_excludes: string | string[],
        //_source_includes: string | string[],
        //terminate_after: number,
        //stats: string | string[],
        //suggest_field: string,
        //suggest_mode: 'missing' | 'popular' | 'always',
        //suggest_size: number,
        //suggest_text: string,
        //timeout: string,
        //track_scores: boolean,
        //track_total_hits: boolean,
        //allow_partial_search_results: boolean,
        //typed_keys: boolean,
        //version: boolean,
        //seq_no_primary_term: boolean,
        //request_cache: boolean,
        //batched_reduce_size: number,
        //max_concurrent_shard_requests: number,
        //pre_filter_shard_size: number,
        //rest_total_hits_as_int: boolean,
        //body: object
      //})
      return response;
    }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_bulk
    // Documentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
    // Code Example:  https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/bulk_examples.html
    async function es_bulk (info, progress = null, create = true) {
      if (create) {
        // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_indices_create
        await client.indices.create({
          index: info.index,
          body: {
            mappings: info.mappings,
            settings: info.settings,
          }
        }, { ignore: [400] })
      }
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_bulk
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/bulk_examples.html
      const bulkResponse = await client.bulk({ 
        refresh: true, 
        body: info.body 
      })

      if (progress) {
        //  'aria-valuenow' : 0, 
        //  'aria-valuemin' : 0, 
        //  'aria-valuemax' : arr_pages_jqXHR_iss_securities_json.length,
        var valuenow = parseInt(progress.attr('aria-valuenow'));
        var valuemax = parseInt(progress.attr('aria-valuemax'));
        valuenow += 1;
        progress.attr('aria-valuenow', valuenow);
        var width = valuenow + '/' + valuemax;
        progress.html(width);
        progress.css('width', ( 100 * valuenow/valuemax ) + '%');
      }

      if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
          const operation = Object.keys(action)[0]
          if (action[operation].error) {
            erroredDocuments.push({
              // If the status is 429 it means that you can retry the document,
              // otherwise it's very likely a mapping error, and you should
              // fix the document before to try it again.
              status: action[operation].status,
              error: action[operation].error,
              operation: body[i * 2],
              document: body[i * 2 + 1]
            })
          }
        })
        console.log(erroredDocuments)
      }
      //const count = await client.count({ index: info.index })
      //console.log(count)
    }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_update
    // Documentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html
    // Code Example:  https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/update_examples.html
    async function es_update (info, progress = null) {
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_update
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/update_examples.html
      const response = await client.update({ 
        id      : info.id,
        index   : info.index,
        refresh : true,
        body    : info.body 
      })

      if (progress) {
        var valuenow = parseInt(progress.attr('aria-valuenow'));
        var valuemax = parseInt(progress.attr('aria-valuemax'));
        valuenow += 1;
        progress.attr('aria-valuenow', valuenow);
        var width = valuenow + '/' + valuemax;
        progress.html(width);
        progress.css('width', ( 100 * valuenow/valuemax ) + '%');
      }
    }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_index
    // Documentation: https://www.elastic.co/guide/en/elasticsearch/reference/7.x/docs-index_.html
    async function es_index (info, progress = null, create = true) {

      if (create) {
        // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_indices_create
        await client.indices.create({
          index: info.index,
          body: {
            mappings: info.mappings,
            settings: info.settings,
          }
        }, { ignore: [400] })
      }
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_index
      // id                   string              - Document ID
      // index                string              - The name of the index
      // type                 string              - The type of the document WARNING: This parameter has been deprecated.
      // wait_for_active_shards 
      //  OR 
      // waitForActiveShards  string              - Sets the number of shard copies that must be active before proceeding with the index operation. 
      //                                            Defaults to 1, meaning the primary shard only. Set to all for all shard copies, otherwise set to any non-negative value less than or 
      //                                            equal to the total number of copies for the shard (number of replicas + 1)
      // op_type 
      //  OR 
      // opType               'index' | 'create'              - Explicit operation type. Defaults to index for requests with an explicit document ID, and to `create`for requests without an explicit document ID
      // refresh              'true' | 'false' | 'wait_for'   - If true then refresh the affected shards to make this operation visible to search, if wait_for then wait for a refresh to make this operation visible to search, if false (the default) then do nothing with refreshes.
      // routing              string              - Specific routing value
      // timeout              string              - Explicit operation timeout
      // version              number              - Explicit version number for concurrency control
      // version_type 
      //  OR 
      // versionType          'internal' | 'external' | 'external_gte' - Specific version type
      // if_seq_no 
      //  OR 
      // ifSeqNo              number              - only perform the index operation if the last operation that has changed the document has the specified sequence number
      // if_primary_term 
      //  OR 
      // ifPrimaryTerm        number              - only perform the index operation if the last operation that has changed the document has the specified primary term
      // pipeline             string              - The pipeline id to preprocess incoming documents with
      // body                 object              - The document
      var response = await client.index({
        id:     info.id,
        index:  info.index,
        //type: string,
        //wait_for_active_shards: string,
        //op_type: 'index' | 'create',
        refresh: 'true',// | 'false' | 'wait_for',
        //routing: string,
        //timeout: string,
        //version: number,
        //version_type: 'internal' | 'external' | 'external_gte',
        //if_seq_no: number,
        //if_primary_term: number,
        //pipeline: string,
        body:   info.body,
      })
      if (response.error) {
        console.log(response);  
      }
      
      if (progress) {
        var valuenow = parseInt(progress.attr('aria-valuenow'));
        var valuemax = parseInt(progress.attr('aria-valuemax'));
        valuenow += 1;
        progress.attr('aria-valuenow', valuenow);
        var width = valuenow + '/' + valuemax;
        progress.html(width);
        progress.css('width', ( 100 * valuenow/valuemax ) + '%');
      }
      //const body = await es_search({ index: info.index, size: 10000 });
      //console.log(body.hits.hits)
    }
    function add_ymd(string) {
      // https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
      // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format
      var date  = new Date();
      //console.log(date);
      //console.log(date.getUTCHours());
      //console.log(date.getHours());
      var month = ("0" + (date.getMonth() + 1)).slice(-2); //months from 1-12
      var day   = ("0" + date.getDate()).slice(-2);
      var year  = date.getFullYear();
      return string + "-" + year + month + day;
    }

