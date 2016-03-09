var UI = (function (mod) {

    mod.refresh = function () {
        console.log('refresh', STATE);
        if(STATE.phase === 'picks') {  
            $('#board-container').hide();          
            UI.picks.update();
            $('#picks-container').show();
        } else {
            $('#picks-container').hide();          
            UI.board.update();
            $('#board-container').show();
        }        
    };

    return mod;

}(UI || {}));