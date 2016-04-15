var CARDS = [

    /******** 1 CC creatures *********/

    {
        'name': 'Footman',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 3,
            'str': 1
        },
        'abilities': [AB.armor(2)]
    },    
    {
        'name': 'Wolf',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 2,
            'str': 3
        },
        'keywords': {
            'piercing': true
        }
    },
    {
        'name': 'Archer',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 2,
            'str': 3
        },
        'keywords': {
            'shooter': true
        }
    },
    {
        'name': 'Goblin Raider',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 2,
            'str': 2
        },
        'abilities': [AB.raid(1)]
    },    

    /******** 2 CC creatures *********/
        
    {
        'name': 'Healer',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 3,
            'str': 1
        },
        'abilities': [{
            'trigger': 'PermanentMoved',
            'condition': 'IF.isMover()',
            effect: function (params) {
                DO.heal({'target': 'adjacent', 'value': 3});
            },
            'text': 'After healer moves, heal 3 damage to all adjacent units.'
        }]  
    },
    {
        'name': 'Blacksmith',
        'type': 'creature',
        'cost': 2,
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
            'text': 'After blacksmith moves, +1 STR to all adjacent friendly units until EOT.'
        }]  
    },
    {
        'name': 'Catapult Tower',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 1,
            'str': 0
        },
        'abilities': [{
            'trigger': 'EndTurn',
            'condition': 'IF.startingFromTurn(1) && IF.playerTurn()',
            effect: function (params) {
                DO.damageOpponent(1);
            },
            'text': 'After one turn delay, at the end of your turn, deal one damage to opponent. Cannot move.'
        }],
        'keywords': {
            'rooted': true
        }
    },
    // {
    //     'name': 'Armorer',
    //     'type': 'creature',
    //     'cost': 2,
    //     'stats': {
    //         'hp': 6,
    //         'str': 1
    //     },
    //     'abilities': [{
    //         'trigger': 'PermanentMoved',
    //         'condition': 'IF.isMover()',
    //         effect: function (params) {
    //             DO.modifyCreatures({
    //                 'target': 'adjacent',
    //                 'filter': 'allies',
    //                 'type': 'ability',
    //                 'value': 'AB.armor(1)',
    //                 'text': 'Armor 1',
    //                 'until': ''
    //             });
    //         },
    //         'text': 'After armorer moves, give Armor 1 to all adjacent friendly units' 
    //     }] 
    // },
    {
        'name': 'Barbarian',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 4,
            'str': 3
        },
        'abilities': [{
            'trigger': 'EndTurn',
            effect: function (params) {
                DO.damageAdjacent(1);
            },
            'text': 'EOT, deal 1 damage to adjacent creatures.'
        }]        
    },
    

    /******** 3 CC spells *********/

    {
        'name': 'Bomb',
        'type': 'trap',
        'cost': 3,
        'abilities': [{
            'trigger': 'EndTurn',
            'condition': 'IF.opponentTurn()',
            effect: function (params) {
                DO.damageAdjacent(3);
                DO.selfDestruct();
            },
            'text': 'At the end of opponent\'s turn, deal 3 damage to adjacent creatures.'
        }]                
    },

    {
        'name': 'Trap',
        'type': 'trap',
        'cost': 3,
        'abilities': [{
            'trigger': 'DefuseTrap',
            'condition': 'IF.isDefused(params)',
            effect: function (params) {
                DO.damageAtCell({'x': params.trap.x, 'y': params.trap.y}, 5);
            },
            'text': 'When defused, deal 5 damage to adjacent creatures.'
        }]                
    },

    {
        'name': 'Heal Bomb',
        'type': 'trap',
        'cost': 3,
        'abilities': [{
            'trigger': 'EndTurn',
            'condition': 'IF.opponentTurn()',
            effect: function (params) {
                DO.heal({'target': 'allies', 'value': 3});
                DO.selfDestruct();
            },
            'text': 'EOOT, heal 3 damage to your creatures.'
        }]                
    },

    {
        'name': 'Buff Trap',
        'type': 'trap',
        'cost': 3,
        'abilities': [{
            'trigger': 'DefuseTrap',
            'condition': 'IF.isDefused(params)',
            effect: function (params) {
                DO.modifyCreatures({
                    'target': 'all',
                    'filter': 'allies',
                    'type': 'str',
                    'value': 2,
                    'until': 'EOT'
                });
                DO.selfDestruct();
            },
            'text': 'EOOT, +2 STR to your creatures.'
        }]                
    }
];