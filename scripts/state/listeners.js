var LISTENERS = (function(){

    var mod = {};

    mod.on = function (trigger, params) {
        _.each(STATE.permanents, function (p) {
            if(!p){return;}
            IF.contextCard = p;
            DO.contextCard = p;
            var template = GE.card.getTemplate(p.name);            
            _.each(template.abilities, function (a) {
                if(a.trigger === trigger){
                    var condition = eval(a.condition);
                    if(condition === true){
                        a.effect(params);
                    }
                }                
            });
        });
    };

    return mod;

}());