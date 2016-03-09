var UI = (function (mod) {

    mod.picks = {};

    mod.picks.update = function () {
        var picks = STATE.picks.current;
        var allPicks = STATE.picks.all;

        // CURRENT PICKS
        // --------------------------------------

        var playerPicks = d3.select('#picks-player').selectAll('.pick')
            .data(picks, function(d) {return d.name; })
              .enter()
            .append('div')
              .classed('pick', true)
              .on('click', function (d) {
                  GE.picks.pickCard(d.name);
              });

        playerPicks.classed('highlighted', function (d) {
            return STATE.players[GE.player.playerNum()].pick === d.name;
        });

        playerPicks.data(picks, function(d) {return d.name; })
          .exit()
          .remove();

        var opponentPicks = d3.select('#picks-opponent').selectAll('.pick')
            .data(picks, function(d) {return d.name; })
              .enter()
            .append('div')
              .classed('pick', true)              
              .on('click', function (d) {
                  GE.picks.guessCard(d.name);
              });

        opponentPicks.classed('highlighted', function (d) {
            return STATE.players[GE.player.opponentNum()].guess === d.name;
        });       

        opponentPicks.data(picks, function(d) {return d.name; })
          .exit()
          .remove();


        // FUTURE PICKS
        // --------------------------------------

        d3.select('#picks-future').selectAll('.future-pick-row').remove();

        var futurePicksRows = d3.select('#picks-future').selectAll('.future-pick-row')
            .data(allPicks)
              .enter()
            .append('div')
              .classed('future-pick-row', true);

        futurePicksRows.append('div')
              .classed('pick-comment', true)
              .text(function (d, i) {
                  return 'Turn + ' + (i+1);
              });

        var futurePicks = futurePicksRows.selectAll('.pick')
            .data(function (d, i) {
                return d;
            })
              .enter()
            .append('div')
              .classed('pick', true);


        // ADD CARD FEATURES
        // --------------------------------------

        var allPicks = d3.selectAll('.pick');

        allPicks.append('div')
          .attr('class','card-name')
          .text(function (d) {return d.name});

        var stats = allPicks.append('div')
          .attr('class','stats');        

        stats.append('div')
          .attr('class','stat stat-hp')
          .text(function (d) {return d.stats.hp});

        stats.append('div')
          .attr('class','stat stat-str')
          .text(function (d) {return d.stats.str});
       

    };

    return mod;

}(UI || {}));