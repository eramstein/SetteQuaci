var GE = (function (mod) {

    mod.creature = {};

    mod.creature.receiveDamage = function (creature, damageDealt) {
        var damageCurrent = creature.damage || 0;

        MUTATORS.setPermanentProperty(creature.id, 'damage', (damageCurrent + damageDealt));
        LISTENERS.on('DealDamage', {
            'creature': creature, 'damageDealt': damageDealt
        });

        if(STATE.permanents[creature.id].damage >= GE.creature.getHp(creature)){
            GE.permanent.deletePermanent(creature);            
        }
    };

    mod.creature.getStrength = function (creature) {
        var template = GE.card.getTemplate(creature.name);
        if(template.type !== 'creature'){return null;}
        return template.stats.str;
    };

    mod.creature.getHp = function (creature) {
        var template = GE.card.getTemplate(creature.name);
        if(template.type !== 'creature'){return null;}
        return template.stats.hp;
    };

    mod.creature.getRemainingHp = function (creature) {
        var template = GE.card.getTemplate(creature.name);
        if(template.type !== 'creature'){return null;}
        var damage = creature.damage || 0;
        return template.stats.hp - damage;
    };

    return mod;

}(GE || {}));