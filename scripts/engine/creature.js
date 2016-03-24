var GE = (function (mod) {

    mod.creature = {};

    mod.creature.receiveDamage = function (creature, damageDealt) {
        if(damageDealt <= 0){return;}

        var damageCurrent = creature.damage || 0;

        MUTATORS.setPermanentProperty(creature.id, 'damage', (damageCurrent + damageDealt));
        LISTENERS.on('DealDamage', {
            'creature': creature, 'damageDealt': damageDealt
        });

        if(STATE.permanents[creature.id].damage >= GE.creature.getHp(creature)){
            GE.permanent.deletePermanent(creature);            
        }
    };

    mod.creature.addModifier = function (creature, modifier) {
        MUTATORS.addModifier(creature.id, {
                    'type': modifier.type,
                    'value': modifier.value,
                    'until': modifier.until
        });
    };    

    mod.creature.getStrength = function (creature) {
        var template = GE.card.getTemplate(creature.name);
        if(template.type !== 'creature'){return null;}
        var modifier = 0;
        if(creature.modifiers && creature.modifiers.constructor === Array){
            modifier = creature.modifiers.reduce(function (previous, current) {
                var val = current.type === 'str' ? current.value : 0;
                return previous + val;
            }, 0);
        }
        return template.stats.str + modifier;
    };

    mod.creature.getHp = function (creature) {
        var template = GE.card.getTemplate(creature.name);
        if(template.type !== 'creature'){return null;}
        var modifier = 0;
        if(creature.modifiers && creature.modifiers.constructor === Array){
            modifier = creature.modifiers.reduce(function (previous, current) {
                var val = current.type === 'hp' ? current.value : 0;
                return previous + val;
            }, 0);
        }
        return template.stats.hp + modifier;
    };

    mod.creature.getRemainingHp = function (creature) {
        var damage = creature.damage || 0;
        return mod.creature.getHp(creature) - damage;
    };

    return mod;

}(GE || {}));