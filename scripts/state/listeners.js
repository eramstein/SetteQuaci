var LISTENERS = (function(){

    var mod = {};

    mod.on = function (trigger, params) {
        _.each(STATE.permanents, function (p) {
            if(!p){return;}
            IF.contextCard = p;
            DO.contextCard = p;
            var abilities = GE.permanent.getAbilities(p);            
            _.each(abilities, function (a) {
                if(a.trigger === trigger){
                    var condition = a.condition ? eval(a.condition) : true;
                    if(condition === true){
                        a.effect(params);
                    }
                }                
            });
        });
    };

    return mod;

}());