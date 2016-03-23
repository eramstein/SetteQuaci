var UI = (function (mod) {

    mod.picks = {};

    mod.picks.update = function () {
        var picks = _.cloneDeep(STATE.picks.current);
        var allPicks = _.cloneDeep(STATE.picks.all);

        picks = _.map(picks, function (p) {
          return GE.card.getTemplate(p.name);
        });

        allPicks = _.map(allPicks, function (p1) {
          return _.map(p1, function (p2) {
            return GE.card.getTemplate(p2.name);
          });
        });

        // CURRENT PICKS
        // --------------------------------------

        $('.current-pick').remove();

        var currentPicks = d3.select('#picks-player').selectAll('.pick')
            .data(picks, function(d) {return d.name + STATE.turn; });

        var currentOppPicks = d3.select('#picks-opponent').selectAll('.pick')
            .data(picks, function(d) {return d.name + STATE.turn; });

        currentPicks
              .enter()
            .append('div')
              .classed('pick', true)
              .classed('current-pick', true)
              .on('click', function (d) {
                  GE.picks.pickCard(d.name);
              });

        currentPicks
        .classed('highlighted', function (d) {
            return STATE.players[GE.player.playerNum()].pick === d.name;
        });

        currentOppPicks
              .enter()
            .append('div')
              .classed('pick', true)    
              .classed('current-pick', true)          
              .on('click', function (d) {
                  GE.picks.guessCard(d.name);
              });

        currentOppPicks
        .classed('highlighted', function (d) {
            return STATE.players[GE.player.playerNum()].guess === d.name;
        }); 


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

        var allPicksSelection = d3.selectAll('.pick');

        allPicksSelection.append('div')
          .classed('card-name', true)
          .text(function (d) {return d.name});

        var stats = allPicksSelection.append('div')
          .attr('class','stats');        

        stats.append('div')
          .attr('class','stat stat-hp')
          .style('display', function (d) {
            return d.stats ? 'block' : 'none';           
          })
          .text(function (d) {
            if(d.stats){
              return d.stats.hp
            }            
          });

        stats.append('div')
          .attr('class','stat stat-str')
          .style('display', function (d) {
            return d.stats ? 'block' : 'none';           
          })
          .text(function (d) {
            if(d.stats){
              return d.stats.str
            }
          });

        var abilitiesBlock = allPicksSelection
            .append('div')
            .attr('class','abilities');        

        var abilities = abilitiesBlock.selectAll('.ability')
            .data(function (d, i) {
                var text = d.text ? d.text.split('|') : null;
                return text || d.abilities || [];
            })
              .enter()
            .append('div')
              .classed('ability', true)
              .text(function (d) {
                var text = d.trigger ? d.trigger + ' ' + d.condition + ' ' + d.effect : d;
                return text;
              });
       

    };

    return mod;

}(UI || {}));