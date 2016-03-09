var MUTATORS = (function(){

    /************************************************************************************
        UTILITY
    ************************************************************************************/

    var mod = {};

    var stateRemote; // path to the game
    var stateChangeFeed; // path to the list of changes published to the other player 
    var stateChangeWatch; // path to the list of changes coming from the other player 

    var setChangeStore = function (gameID) {        
        //setup feeds for sending and receiving changes 
        var otherPlayer = STATE.players.player1.name === LOB.userName ? STATE.players.player2.name : STATE.players.player1.name;
        
        stateChangeFeed = FIREBASE.child('games/' + gameID + '/' + otherPlayer);
        stateChangeWatch = FIREBASE.child('games/' + gameID + '/' + LOB.userName);

        stateChangeWatch.on('child_added', function (snapshot) {
            var stateChange = snapshot.val();
            var path = stateChange.path.split('/');
            var objectToChange = STATE;
            _.forEach(path, function (item, index) {
                if(index === path.length - 1) {
                    objectToChange[item] = stateChange.value;                    
                } else {
                    objectToChange = objectToChange[item]; 
                }                
            });
        });
    };

    var syncBackend = function (childPath, newVal) {
        if(childPath === 'initial'){
            stateRemote.child(childPath).set(newVal);
        } else {
            stateChangeFeed.push({
                'path': childPath,
                'value': newVal
            });
        }                
    };

    var sync = function(childPath, newVal){
        syncBackend(childPath, newVal);        
        UI.refresh(STATE);
    };

    mod.setRemoteStore = function (gameID) {
        stateRemote = FIREBASE.child('games/' + gameID);
        
        stateRemote.on('value', function (snapshot) {            
            var remoteState = snapshot.val();

            var onStateUpdated = function () {
                UI.refresh(); 

                // set wather and feeder
                if(!stateChangeFeed){
                    setChangeStore(gameID);
                }                               

                // stop listening
                stateRemote.off(); 
            }

            //initial state or load state
            if(remoteState.last) {
                console.log(remoteState);
                STATE = remoteState.last;
                onStateUpdated(); 
            } 
            else if(remoteState.initial) {
                STATE = remoteState.initial;
                onStateUpdated();                                
            }                  
        });

    };

    mod.saveGame = function() {
        stateRemote.child('last').set(STATE);
        stateChangeWatch.set(true);
    };

    


    /************************************************************************************
        MUTATORS - modify STATE and run sync()
    ************************************************************************************/

    mod.setInitialState = function (state) {

        var player1 = state.players.player1.name;
        var player2 = state.players.player2.name;

        //prepare feeds for both users
        var initialGame = {};
        initialGame[player1] = true;
        initialGame[player2] = true;

        //create game
        var createdGame = FIREBASE.child('games').push(initialGame).key();  

        //add players to the list of ingame players
        LOB.addPlayersToGame(player1, player2, createdGame);

        //set store
        mod.setRemoteStore(createdGame);

        sync('initial', state);
    };

    mod.moveCreature = function (creatureId, x, y) {
        var newPos = {
            'x': x,
            'y': y
        };
        STATE.creatures[creatureId].pos = newPos;
        sync('creatures/' + creatureId + '/pos', newPos);
    };

    mod.setPhase = function (val) {
        STATE.phase = val;
        sync('phase', val);
    };

    mod.setCurrentPicks = function (val) {
        STATE.picks.current = val;
        sync('picks/current', val);
    };

    mod.setAllPicks = function (val) {
        STATE.picks.all = val;
        sync('picks/all', val);
    };

    mod.setPickedCard = function (val) {
        STATE.players[val.playerNum].pick = val.pick;
        sync('players/' + val.playerNum + '/pick', val.pick);
    };

    mod.setGuessedCard = function (val) {
        STATE.players[val.playerNum].guess = val.pick;
        sync('players/' + val.playerNum + '/guess', val.pick);
    };

    mod.addCardToHand = function (val) {
        var card = {
            'name': val.cardName,
            'guessed': val.guessed
        };
        var hand = STATE.players[val.playerNum].hand || [];
        hand.push(card);
        sync('players/' + val.playerNum + '/hand', hand);
    };

    return mod;

}());