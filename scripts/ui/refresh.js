var UI = (function (mod) {

    mod.refresh = function (newState) {
        console.log('refresh', newState);
        if(newState.picks && newState.picks.current) {
            UI.picks.update();
        } else {
            UI.board.update();
        }        
    };

    return mod;

}(UI || {}));