var MUTATORS = (function(){

    /************************************************************************************
        UTILITY
    ************************************************************************************/

    var mod = {};

    var stateRemote;

    mod.setRemoteStore = function (gameID) {
        stateRemote = FIREBASE.child('games/' + gameID);

        stateRemote.on('value', function (snapshot) {            
            var newState = snapshot.val();
            if(!newState.turn){
                GE.game.init(newState.players);
                return;
            }
            if(_.isEqual(newState, STATE) === false) {
                STATE = newState;
                UI.refresh(STATE);
            }       
        });  
    };    

    var syncBackend = function () {
        stateRemote.set(STATE);
    };

    var sync = function(){        
        syncBackend();        
        UI.refresh(STATE);
    };


    /************************************************************************************
        MUTATORS - modify STATE and run sync()
    ************************************************************************************/

    mod.setRemoteState = function (newState) {
        // use with caution!
        STATE = newState;

        sync();
    };

    mod.moveCreature = function (creatureId, x, y) {
        STATE.creatures[creatureId].pos = {
            'x': x,
            'y': y
        };

        sync();
    };

    mod.setCurrentPicks = function (picks) {
        STATE.picks.current = picks;

        sync();
    };

    return mod;

}());