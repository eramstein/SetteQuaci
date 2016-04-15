var GE = (function (mod) {

    mod.trap = {};

    mod.trap.defuseCell = function (x, y, creature) {
        var trap = GE.permanent.getPermanents({'x': x, 'y': y, 'owner': GE.player.opponentNum()});
        if(trap.length === 0){return;}
        trap = trap[0];
        
        LISTENERS.on('DefuseTrap', {'trap': trap, 'creature': creature});
        GE.permanent.deletePermanent(trap);
        
    };

    return mod;

}(GE || {}));