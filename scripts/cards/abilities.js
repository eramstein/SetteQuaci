var AB = {

    armor: function (armorVal) {
        return {
            'trigger': 'BeforeDealCombatDamage',
            'condition': 'IF.isDefender()',
            effect: function (params) {
                if(params.defender.keywords && params.defender.keywords.piercing === true){return;}

                GE.combat.tempData.damageAbsorbed = armorVal;
            }
        };
    }

};