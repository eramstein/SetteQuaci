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
        'abilities': [AB.armor(1)]
    },
    {
        'name': 'Zombie',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 3,
            'str': 1
        }
    },
    {
        'name': 'Blacksmith',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 3,
            'str': 1
        },
        'abilities': [{
            'trigger': 'PermanentMoved',
            'condition': 'IF.isMover()',
            effect: function (params) {
                DO.modifyCreatures({
                    'target': 'adjacent',
                    'filter': 'allies',
                    'type': 'str',
                    'value': 1,
                    'until': 'EOT'
                });
            },
            'text': 'After blacksmith moves, +1 STR to all adjacent friendly units until EOT'
        }]  
    },
    {
        'name': 'Wolf',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 2,
            'str': 2
        },
        'keywords': {
            'piercing': true
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
            },
            'text': 'EOOT, deal 3 damage to adjacent creatures'
        }]                
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
        'abilities': [AB.armor(2)]
    },
    {
        'name': 'Armorer',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 6,
            'str': 1
        },
        'abilities': [{
            'trigger': 'PermanentMoved',
            'condition': 'IF.isMover()',
            effect: function (params) {
                DO.modifyCreatures({
                    'target': 'adjacent',
                    'filter': 'allies',
                    'type': 'ability',
                    'value': 'AB.armor(1)',
                    'text': 'Armor 1',
                    'until': ''
                });
            },
            'text': 'After armorer moves, give Armor 1 to all adjacent friendly units' 
        }] 
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
            },
            'text': 'EOT, deal 1 damage to adjacent creatures'
        }]        
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