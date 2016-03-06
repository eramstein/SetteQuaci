var UI = (function (mod) {

    mod.refresh = function () {
        console.log('refresh', STATE);
        if(STATE.picks && STATE.picks.current) {
            UI.picks.update();
        } else {
            UI.board.update();
        }        
    };

    return mod;

}(UI || {}));