var MUTATORS = (function(){

    /************************************************************************************
        UTILITY
    ************************************************************************************/

    var mod = {};
    var _gameId;

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
                    if(stateChange.value === 'REMOVE'){
                        delete objectToChange[item];
                    } else {
                        objectToChange[item] = stateChange.value;
                    }                                        
                } else {
                    if(!objectToChange[item] || objectToChange[item] === true){
                        objectToChange[item] = {};
                    }
                    objectToChange = objectToChange[item]; 
                }                
            });
            UI.refresh(); 
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
        if(newVal !== null){
            if(newVal === undefined || (newVal.constructor === Array && newVal.length ===0)){
                newVal = true;
            }
        }       
        syncBackend(childPath, newVal);        
        UI.refresh(STATE);
    };

    mod.setRemoteStore = function (gameID) {
        _gameId = gameID;
        stateRemote = FIREBASE.child('games/' + gameID);
        
        stateRemote.on('value', function (snapshot) {            
            var remoteState = snapshot.val();

            var onStateUpdated = function () {
                UI.refresh(); 

                // set watcher and feeder
                if(!stateChangeFeed){
                    setChangeStore(gameID);
                }                               

                // stop listening
                stateRemote.off(); 
            }

            //initial state or load state
            if(remoteState.last) {
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

    mod.endGame = function () {
        FIREBASE.child('games/' + _gameId).set(null);
        FIREBASE.child('ingame/' + STATE.players.player1.name).set(null);
        FIREBASE.child('ingame/' + STATE.players.player2.name).set(null);
    };

    mod.clearPermanentsTemporaryAttrs = function (playerNum) {
        _.each(STATE.permanents, function (p) {
            if(p.owner === playerNum){
                p.hasMoved = false;
                p.hasAttacked = false;
            }
        });
        //not synced, this is local to the player
    };

    mod.clearPlayersTemporaryAttrs = function () {
        STATE.players.player1.pick = null;
        STATE.players.player2.pick = null;
        STATE.players.player1.guess = null;
        STATE.players.player2.guess = null;
        sync('players', STATE.players);
    };

    mod.addPermanent = function (card) { 
        
        if(!STATE.permanents || STATE.permanents === true){
            STATE.permanents = {};
        }
        STATE.permanents[card.id] = card;
        sync('permanents/' + card.id, card);
    };

    mod.updatePermanent = function (card) { 
        STATE.permanents[card.id] = card;
        sync('permanents/' + card.id, card);
    };

    mod.setPermanentProperty = function (cardId, propertyName, value, nosync) { 
        STATE.permanents[cardId][propertyName] = value;
        if(!nosync){
            sync('permanents/' + cardId + '/' + propertyName, value);
        }        
    };

    mod.setPlayerProperty = function (player, propertyName, value) { 
        STATE.players[player][propertyName] = value;
        sync('players/' + player + '/' + propertyName, value);        
    };

    mod.deletePermanent = function (cardId) { 
        delete STATE.permanents[cardId];
        sync('permanents/' + cardId, 'REMOVE');
    };

    mod.movePermanent = function (cardId, x, y) { 
        STATE.permanents[cardId].x = x;
        STATE.permanents[cardId].y = y;
        STATE.permanents[cardId].hasMoved = true;
        sync('permanents/' + cardId, STATE.permanents[cardId]);        
    };

    mod.setPhase = function (val) {
        STATE.phase = val;
        sync('phase', val);
    };

    mod.setTurn = function (val) {
        STATE.turn = val;
        sync('turn', val);
    };

    mod.setSeason = function (val) {
        STATE.season = val;
        sync('season', val);
    };

    mod.setCurrentPlayer = function (val) {
        STATE.currentPlayer = val;
        sync('currentPlayer', val);
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
        card.owner = val.playerNum;
        card.id = val.playerNum + '_' + STATE.turn + '_' + val.cardName;

        if(!STATE.players[val.playerNum].hand || STATE.players[val.playerNum].hand.constructor !== Array){
            STATE.players[val.playerNum].hand = [card];
        } else {
            STATE.players[val.playerNum].hand.push(card);
        }
        sync('players/' + val.playerNum + '/hand', STATE.players[val.playerNum].hand);
    };

    mod.removeCardFromHand = function (player, cardId) {
        var hand = STATE.players[player].hand;
        _.remove(hand, {
            'id': cardId
        });
        sync('players/' + player + '/hand', hand);
    };

    return mod;

}());