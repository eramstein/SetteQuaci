var IF = {

    contextCard: null,

    seasonIs: function (seasonNum) {
        return STATE.season === seasonNum;
    },

    turnIs: function (difference) {
        return IF.contextCard.turnPlayedOn + difference === STATE.turn;
    },

    opponentTurn: function (difference) {
        return IF.contextCard.owner !== GE.player.playerNum();
    },

    isDefender: function () {
        return IF.contextCard.id === GE.combat.tempData.defender.id;
    },

    isAttacker: function () {
        return IF.contextCard.id === GE.combat.tempData.attacker.id;
    },

    isMover: function () {
        return IF.contextCard.id === GE.permanent.tempData.mover.id;
    }

};
