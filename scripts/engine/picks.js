var GE = (function (mod) {

    mod.picks = {};

    mod.picks.buildPicks = function () {

        var picks = [];
        var cost = Math.ceil(Math.random() * 2);
        var options = _.filter(CARDS, {'cost': cost});

        for (var i = 0; i < 4; i++) {
            var card = _.sample(options);
            _.pull(options, card);
            picks.push(card);
        };       

        return picks;

    };

    mod.picks.getInitialPicks = function () {

        var pickList = [];

        for (var i = 0; i < 10; i++) {
            pickList.push(mod.picks.buildPicks());
        };

       return pickList;       

    };

    mod.picks.draw = function () {

        var pickList = _.clone(STATE.picks.all);

        MUTATORS.setCurrentPicks(pickList[0]);

        pickList.push(mod.picks.buildPicks());
        pickList.shift();

        MUTATORS.setAllPicks(pickList);       

    };

    return mod;

}(GE || {}));