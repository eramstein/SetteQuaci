var UI = (function (mod) {

    mod.state = {
        'selectedCard': null
    };

    mod.state.selectPlayer = function (player) {

        var template = GE.card.getTemplate(mod.state.selectedCard.name);
        //case selected card is a creature -> attack player
        if(mod.state.selectedCard && template.type === 'creature'){
            GE.combat.declareAttack(mod.state.selectedCard.id, player);
        } 

    };

    mod.state.selectCard = function (element, clickedCard) {

        d3.selectAll('.card.selected').classed('selected', false);

        var clickedCardTemplate = GE.card.getTemplate(clickedCard.name);

        //case it's an ennemy creature and there is a currently selected friendly creature -> attack it
        if(mod.state.selectedCard && 
           mod.state.selectedCard.owner === GE.player.playerNum() &&
           clickedCardTemplate.type === 'creature' &&
           mod.state.selectedCard.x &&
           clickedCard.owner === GE.player.opponentNum()
           ) {
          GE.combat.declareAttack(mod.state.selectedCard.id, clickedCard.id);
        }

        //case it's an ennemy trap and there is a currently selected friendly creature -> move to it
        if(mod.state.selectedCard && 
           mod.state.selectedCard.owner === GE.player.playerNum() &&
           clickedCardTemplate.type === 'trap' &&
           mod.state.selectedCard.x &&
           clickedCard.owner === GE.player.opponentNum()
           ) {
          GE.permanent.move(mod.state.selectedCard, clickedCard.x, clickedCard.y);
        }

        //case selected card is the currently selected one -> un-select it
        if(mod.state.selectedCard && mod.state.selectedCard.id === clickedCard.id){
            mod.state.selectedCard = null; 
        } else {
            mod.state.selectedCard = clickedCard;        
            d3.select(element).classed('selected', true);
        }

    };

    mod.state.selectCell = function (x, y) {

        //case selected card is in current player's hand -> play card
        if(mod.state.selectedCard && 
           mod.state.selectedCard.owner === GE.player.playerNum() && 
           STATE.currentPlayer === GE.player.playerNum() && 
           !mod.state.selectedCard.x){
            GE.card.play(mod.state.selectedCard, x, y);
            return;
        }

        //case selected card is in play under current player control -> move it if possible
        if(mod.state.selectedCard && 
           mod.state.selectedCard.owner === GE.player.playerNum() && 
           STATE.currentPlayer === GE.player.playerNum() && 
           mod.state.selectedCard.x){
            GE.permanent.move(mod.state.selectedCard, x, y);
            return;
        }

    };

    return mod;

}(UI || {}));