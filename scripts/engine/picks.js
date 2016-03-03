var GE = (function (mod) {

    mod.picks = {};

    mod.picks.getPicks = function () {

        var picks = [1,2,3,4];

        return picks;

    };

    mod.picks.generate = function () {

        var picks = mod.picks.getPicks();

        MUTATORS.setCurrentPicks(picks);

    };

    return mod;

}(GE || {}));