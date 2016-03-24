var AB = {

    armor: function (armorVal) {
        return {
            'trigger': 'BeforeDealCombatDamage',
            'condition': 'IF.isDefender()',
            effect: function (params) {
                var attackerKeywords = GE.permanent.getKeywords(params.attacker);
                if(attackerKeywords.piercing === true){return;}
                GE.combat.tempData.damageAbsorbed = GE.combat.tempData.damageAbsorbed || 0;
                GE.combat.tempData.damageAbsorbed += armorVal;
            },
            'text': 'Armor ' + armorVal
        };
    }

};