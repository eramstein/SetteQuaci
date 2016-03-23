var GE = (function (mod) {

    mod.combat = {};

    var tempData = {};

    var dealDamage = function (attacker, defender) {
        var creaturecombat = defender !== 'player1' && defender !== 'player2';
        var damageDealt = GE.creature.getStrength(attacker);

        LISTENERS.beforeDealCombatDamage(attacker, defender, damageDealt);

        if(creaturecombat){ 
            GE.creature.receiveDamage(defender, damageDealt);          
        }
        else {
            MUTATORS.setPlayerProperty(defender, 'hp', STATE.players[defender].hp - 1);
        }        

    };

    var isAttackValid = function (attacker, defender) {
        var opponentColumns = GE.player.playerNum() === 'player1' ? [3,4] : [1,2];

        //check if able to attack
        if(attacker.hasAttacked ||
           attacker.hasMoved ||
           STATE.currentPlayer !== GE.player.playerNum() ||
           attacker.turnPlayedOn === STATE.turn){
            return false;
        }

        //check if target valid
        if(defender !== 'player1' && defender !== 'player2'){  
            //creature attack case 
            //same row?
            if(attacker.y !== defender.y) { return false; }
            //blocker?
            if( (defender.x === 1 && GE.permanent.getPermanents({'x': 2, 'y': attacker.y}).length > 0) ||
                (defender.x === 4 && GE.permanent.getPermanents({'x': 3, 'y': attacker.y}).length > 0)
              ) { return false; }
        } else {
            //player attack case
            //blocker?
            if( GE.permanent.getPermanents({'x': opponentColumns[0], 'y': attacker.y}).length > 0 ||
                GE.permanent.getPermanents({'x': opponentColumns[1], 'y': attacker.y}).length > 0
              ) { return false; }
        }

        return true;
    }; 

    mod.combat.declareAttack = function (attacker, defender) {        
        //get objects
        attacker = GE.permanent.getPermanents({'id': attacker})[0];
        if(defender !== 'player1' && defender !== 'player2'){    
            defender = GE.permanent.getPermanents({'id': defender})[0]; 
        }
        console.log('BASTON', attacker, defender);
        //tempData = {};
        console.log(attacker.hasAttacked);

        if(isAttackValid(attacker, defender)){            
            LISTENERS.onDeclareAttack(attacker, defender);
            mod.combat.resolveAttack(attacker, defender);
        }     
    };

    mod.combat.resolveAttack = function (attacker, defender) {
        //reveal attacker
        if(!attacker.revealed){
            MUTATORS.setPermanentProperty(attacker.id, 'revealed', true);
        }

        //case attack a creature
        if(defender !== 'player1' && defender !== 'player2'){            
            //reveal defender
            if(!defender.revealed){
                MUTATORS.setPermanentProperty(defender.id, 'revealed', true);
            }
            
        }

        //deal damage
        dealDamage(attacker, defender);        

        MUTATORS.setPermanentProperty(attacker.id, 'hasAttacked', true, false);        
    };

    return mod;

}(GE || {}));