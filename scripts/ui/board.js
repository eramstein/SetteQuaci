var UI = (function (mod) {

    mod.board = {};

    var _svg = null,
    _gContainer = null,
    _gBattelfield = null,
    _gPermanents = null,
    _gLeftColumn = null,
    _gRightColumn = null,
    _gPlayerBoard = null,
    _gOpponentBoard = null,
    _gPlayerLife = null,
    _gOpponentLife = null,
    _gPlayerHand = null,
    _gOpponentHand = null,
    _gTurnInfo = null,
    _gEndTurn = null,
    _gConcede = null,
    _gCurrentPlayer = null,

    _screenWidth = $(window).width() - 20,
    _screenHeight = $(window).height() - 20,

    _cellWidth = 150, // includes padding around the card
    _cellHeight = _cellWidth * 4/3,
    _cellPadding = 0,

    _boardWidth = _cellWidth * 6.5,
    _boardHeight = _cellHeight * 4,

    _lifeBubbleRadius = 20,
    _lifeBubbleMarginTop = 20,

    _boardLeft = (_screenWidth - _boardWidth) / 2,
    _boardTop = (_screenHeight - _boardHeight) / 2
    ;  

    mod.board.init = function () {

        if(_svg){return;}

        _svg = d3.select('#board-container').append('svg')
            .attr('width', _screenWidth)
            .attr('height', _screenHeight);

        _gContainer = _svg.append('g');

        // LEFT COLUMN
        // ----------------------------------------------------------------

        _gLeftColumn = _gContainer.append('g').attr('id', 'board-left-column')
            .attr('transform', 'translate(' + (_boardLeft - _cellWidth/2) + ',' + _boardTop + ')');

        _gLeftColumn.append('text')
            .attr('x', _cellWidth / 2)
            .attr('y', _lifeBubbleMarginTop - 15)
            .text(function () {
                return LOB.userName;
            });

        _gPlayerHand = _gLeftColumn.append('g')
            .attr('transform', 'translate(0,' + (_lifeBubbleRadius * 2 + _lifeBubbleMarginTop * 2) + ')');

        _gPlayerLife = _gLeftColumn.append('g')
            .classed('life-counter', true)
            .attr('transform', 'translate(' + (_cellWidth / 2) + ',' +  (_lifeBubbleRadius + _lifeBubbleMarginTop) + ')')
            .on('click', function () {
                UI.state.selectPlayer(GE.player.playerNum());
            });
        _gPlayerLife.append('circle')
            .attr('r', _lifeBubbleRadius);
        _gPlayerLife.append('text')
            .attr('id', 'player-life')
            .attr('y', 5);


        // RIGHT COLUMN
        // ----------------------------------------------------------------

        _gRightColumn = _gContainer.append('g').attr('id', 'board-right-column')
            .attr('transform', 'translate(' + (_boardLeft + _boardWidth - _cellWidth/2) + ',' + _boardTop + ')');

        _gRightColumn.append('text')
            .attr('x', _cellWidth / 2)
            .attr('y', _lifeBubbleMarginTop - 15)
            .text(function () {
                return GE.player.opponentName();
            });

        _gOpponentHand = _gRightColumn.append('g')
            .attr('transform', 'translate(0,' + (_lifeBubbleRadius * 2 + _lifeBubbleMarginTop * 2) + ')');

        _gOpponentLife = _gRightColumn.append('g')
            .classed('life-counter', true)
            .attr('transform', 'translate(' + (_cellWidth / 2) + ',' +  (_lifeBubbleRadius + _lifeBubbleMarginTop) + ')')
            .on('click', function () {
                UI.state.selectPlayer(GE.player.opponentNum());
            });
        _gOpponentLife.append('circle')
            .attr('r', _lifeBubbleRadius);
        _gOpponentLife.append('text')
            .attr('id', 'opponent-life')
            .attr('y', 5);

        _gTurnInfo = _gRightColumn.append('g')
            .attr('transform', 'translate(40,' + (_boardTop + _boardHeight - _cellHeight) + ')');
        _gTurnInfo.append('text').attr('id', 'turn-count').attr('y', 0);
        _gTurnInfo.append('text').attr('id', 'season-name').attr('y', 25);

        _gEndTurn = _gTurnInfo.append('g')
            .attr('class', 'button')
            .on('click', function () {
                    GE.game.endTurn();
            })
            .attr('transform', 'translate(0, 40)');

        _gEndTurn.append('rect').attr('id', 'end-turn-button') 
            .attr('width', 110)
            .attr('height', 30)
            
        _gEndTurn.append('text').attr('id', 'end-turn-button-text').attr('x', 55).attr('y', 20);

        _gConcede = _gTurnInfo.append('g')
            .attr('class', 'button')
            .on('click', function () {
                    GE.game.end();
            })
            .attr('transform', 'translate(0, 120)');

        _gConcede.append('rect').attr('id', 'concede-button') 
            .attr('width', 110)
            .attr('height', 30)
            
        _gConcede.append('text').attr('x', 55).attr('y', 20).text('Concede');


        // BATTLEFIELD
        // ----------------------------------------------------------------     

        _gBattelfield = _gContainer.append('g').attr('id', 'battlefield')
                            .attr('transform', 'translate(' + (_boardLeft + _cellWidth) + ',' + _boardTop + ')');

        var buildCell = function (x, y) {            
            var subjectiveX = GE.player.playerNum() === 'player1' ? x : (5 - x);
            var centerGap = subjectiveX > 2 ?  _cellWidth / 2 : 0;
            _gBattelfield.append('rect')
                .attr('id', 'cell-' + x + '-' + y)
                .attr('class', 'cell')
                .attr('x', _cellWidth * (subjectiveX-1) + centerGap)
                .attr('y', _cellHeight * (y-1))
                .attr('width', _cellWidth)
                .attr('height', _cellHeight)
                .on('click', function (d) {
                    UI.state.selectCell(x, y);
                });
        }

        for (var x = 1; x <= 4; x++) {
            for (var y = 1; y <= 4; y++) {
                buildCell(x, y);
            };
        };

        // PERMANENTS
        // ----------------------------------------------------------------
        _gPermanents = _gBattelfield.append('g');


        // CURRENT PLAYER MARKER
        // ----------------------------------------------------------------
        _gCurrentPlayer = _gContainer.append('g');
        _gCurrentPlayer.append('text').attr('class', 'current-player-badge').text('Playing');
        
    }




    mod.board.update = function () {

        if(!_svg){mod.board.init();}

        // LIFE
        // ----------------------------------------------------------------

        d3.select('#player-life').text(function () { return GE.player.playerLife(); });
        d3.select('#opponent-life').text(function () { return GE.player.opponentLife(); });

        // HANDS
        // ----------------------------------------------------------------
        var playerCardsInHand = GE.player.playerHand();

        var playerHandSelection = _gPlayerHand.selectAll('.card')
            .data(playerCardsInHand, function (d) { return d.id;});

        var playerHandEnter = playerHandSelection.enter()
            .append('g')
            .on('click', function (d) {
                UI.state.selectCard(this, d);
            })
            .classed('card', true);

        var playerHandUpdate = playerHandSelection.attr('transform', function (d, i) {
                return ('translate(0,' + i * (_cellHeight + _cellPadding) + ')');
            });

        playerHandSelection.exit()
            .remove();

        UI.card.enter(playerHandEnter, _cellWidth, _cellHeight - _cellPadding);  
        UI.card.update(playerHandUpdate, _cellWidth, _cellHeight - _cellPadding);

        var opponentCardsInHand = GE.player.opponentHand();

        var opponentHandSelection = _gOpponentHand.selectAll('.card')
            .data(opponentCardsInHand, function (d) { return d.id;});

        var opponentHandUpdate = opponentHandSelection.enter()
            .append('g')
            .on('click', function (d) {
                UI.state.selectCard(this, d);
            })
            .classed('card', true);

        var opponentHandEnter = opponentHandSelection.attr('transform', function (d, i) {
                return ('translate(0,' + i * (_cellHeight + _cellPadding) + ')');
            });

        opponentHandSelection.exit()
            .remove();

        UI.card.enter(opponentHandEnter, _cellWidth, _cellHeight - _cellPadding);  
        UI.card.update(opponentHandUpdate, _cellWidth, _cellHeight - _cellPadding); 

        // TURN / SEASON / END BUTTON / CURRENT PLAYER
        // ----------------------------------------------------------------

        d3.select('#turn-count').text(function () { return 'Turn ' + STATE.turn; });
        d3.select('#season-name').text(function () { return GE.game.seasonNames[STATE.season]; });
        d3.select('#end-turn-button-text').text(function () { 
            return GE.player.playerNum() === STATE.currentPlayer ? 'End Turn' : 'Opponent\'s turn'; 
        });
        d3.select('#end-turn-button')
            .classed('active', function () { 
                return GE.player.playerNum() === STATE.currentPlayer; 
            });

        _gCurrentPlayer.transition().duration(CONFIG.animationDuration)
            .attr('transform', function () {
                var x = GE.player.playerNum() === STATE.currentPlayer ? _boardLeft : _boardLeft + _boardWidth;
                return ('translate(' + x + ',' + (_boardTop - 15) + ')');
            });

        // PERMANENTS
        // ----------------------------------------------------------------
        var permanents = GE.permanent.getPermanents(null);
        var permanentSelection = _gPermanents.selectAll('.card')
            .data(permanents, function (d) { return d.id;});

        var permanentEnter = permanentSelection
            .enter()
            .append('g')
            .on('click', function (d) {
                UI.state.selectCard(this, d);
            })
            .classed('card', true)
            .classed('creature', function (d) {
                return GE.card.getTemplate(d.name).type === 'creature';
            })
            .attr('transform', function (d) {
                return ('translate(-' + (_cellWidth*1.5) + ',' + (_cellHeight*0.5) + ')');
            });          

        var permanentUpdate = permanentSelection
            .transition().duration(CONFIG.animationDuration)
            .attr('transform', function (d) {
                var subjectiveX = GE.player.playerNum() === 'player1' ? d.x : (5 - d.x);
                var centerGap = subjectiveX > 2 ?  _cellWidth / 2 : 0;
                var x = _cellWidth * (subjectiveX-1) + centerGap;
                var y = _cellHeight * (d.y-1);
                return ('translate(' + x + ',' + y + ')');
            });

        permanentSelection
            .exit()
            .remove();

        UI.card.enter(permanentEnter, _cellWidth - _cellPadding - 1, _cellHeight - _cellPadding);  
        UI.card.update(permanentUpdate, _cellWidth - _cellPadding - 1, _cellHeight - _cellPadding);

        
    };

    return mod;

}(UI || {}));