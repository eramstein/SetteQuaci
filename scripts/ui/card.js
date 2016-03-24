var UI = (function (mod) {

    mod.card = {};

    mod.card.enter = function (selection, cardWidth, cardHeight) {

        selection.append('rect')
            .attr('class', 'card-frame')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', cardWidth)
            .attr('height', cardHeight);

        selection.append('text')
            .attr('class', 'card-name')
            .attr('x', function () { return cardWidth / 2; })
            .attr('y', 20)
            .text(function (d) {
                return d.name;
            });

        var abilitiesBlock = selection.append('foreignObject')
            .attr({
                'x': 0,
                'y': 40,
                'width': cardWidth,
                'height': cardHeight - 60,
                'class': 'abilities'
            });

        var abilities = abilitiesBlock.selectAll('.ability')
            .data(function (d, i) {
                var abilities = GE.permanent.getAbilities(d);
                var text = abilities.reduce(function (previous, current) {
                    return previous + current.text + '<br>';
                }, '');
                var keywords = GE.permanent.getKeywords(d);
                _.each(keywords, function (value, key) {
                    text += '<i>' + key + '</i><br>';
                });
                return [text];
            })
              .enter()
            .append('xhtml:div')
            .append('div')
              .classed('ability', true)
              .html(function (d) {
                return d;
              });

        var stats = selection.append('g')
                        .attr('transform', 'translate(0, ' + (cardHeight - 25) + ')')
                        .attr('opacity', function (d) {
                            var template = GE.card.getTemplate(d.name);
                            return template.type === 'creature' ? 1 : 0;
                        });

        stats.append('rect')
            .attr('class', 'stat stat-hp')
            .attr('x', function () { return cardWidth - 25; })
            .attr('y', 0)
            .attr('width', 20)
            .attr('height', 20);

        stats.append('text')
            .attr('class', 'stat stat-hp')
            .attr('x', function () { return cardWidth - 15; })
            .attr('y', 14); 

        stats.append('rect')
            .attr('class', 'stat stat-str')
            .attr('x', function () { return cardWidth - 50; })
            .attr('y', 0)
            .attr('width', 20)
            .attr('height', 20);

        stats.append('text')
            .attr('class', 'stat stat-str')
            .attr('x', function () { return cardWidth - 40; })
            .attr('y', 14);

        selection.append('rect')
            .attr('class', 'card-hiding-frame')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', cardWidth)
            .attr('height', cardHeight);
    }


    mod.card.update = function (selection, cardWidth, cardHeight) {

        selection.select('.card-hiding-frame').attr('visibility', function (d) {
            if(d.guessed || 
               d.owner === GE.player.playerNum() || 
               d.revealed === true){
                return 'hidden';
            } else {
                return 'visible';
            }
        });

        selection.select('text.stat-hp').text(function (d) {
            return GE.creature.getRemainingHp(d);
        });

        selection.select('text.stat-str').text(function (d) {
            return GE.creature.getStrength(d);
        });

    }

    return mod;

}(UI || {}));