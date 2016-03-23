var CARDS = [

    /******** 1 CC creatures *********/

    {
        'name': 'Peasant',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 3,
            'str': 1
        },
        'abilities': [AB.armor(1)],
        'text': 'Armor 1'  
    },
    {
        'name': 'Zombie',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 2,
            'str': 2
        }
    },
    {
        'name': 'Ghoul',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 3,
            'str': 1
        },
        'keywords': {
            'piercing': true
        },
        'text': 'Piercing'  
    },
    {
        'name': 'Wolf',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 2,
            'str': 2
        }
    },
    {
        'name': 'Sheep',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 3,
            'str': 3
        }
    },

    /******** 1 CC spells *********/

    {
        'name': 'Bomb',
        'type': 'trap',
        'cost': 1,
        'abilities': [{
            'trigger': 'EndTurn',
            'condition': 'IF.opponentTurn()',
            effect: function (params) {
                DO.damageAdjacent(3);
                DO.selfDestruct();
            }
        }],
        'text': 'EOOT, deal 3 damage to adjacent creatures'                
    },

    /******** 2 CC creatures *********/

    
    {
        'name': 'Bear',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 8,
            'str': 3
        }
    },
    {
        'name': 'Knight',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 5,
            'str': 2
        },
        'abilities': [AB.armor(2)],
        'text': 'Armor 2'  
    },
    {
        'name': 'Vampire',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 3,
            'str': 1
        }
    },
    {
        'name': 'Barbarian',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 5,
            'str': 4
        },
        'abilities': [{
            'trigger': 'EndTurn',
            'condition': 'true',
            effect: function (params) {
                DO.damageAdjacent(1);
            }
        }],
        'text': 'EOT, deal 1 damage to adjacent creatures'        
    },
    {
        'name': 'Giant Spider',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 9,
            'str': 2
        }
    }
];