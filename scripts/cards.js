var CARDS = [

    /******** 1 CC creatures *********/

    {
        'name': 'Peasant',
        'type': 'creature',
        'cost': 1,
        'stats': {
            'hp': 1,
            'str': 3
        }
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
        }
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
        'name': 'Winter Bomb',
        'type': 'trap',
        'cost': 1,
        'abilities': [{
            'trigger': 'EndTurn',
            'condition': 'IF.seasonIs(4) && IF.opponentTurn()',
            effect: function () {
                console.log('BOOM');
                DO.damageAdjacent(3);
                DO.selfDestruct();
            }
        }]              
    },

    /******** 2 CC creatures *********/

    
    {
        'name': 'Bear',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 3,
            'str': 8
        }
    },
    {
        'name': 'Rogue',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 2,
            'str': 5
        }
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
        'name': 'Knight',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 5,
            'str': 5
        },
        'abilities': [{
            'trigger': 'EndTurn',
            'condition': 'IF.seasonIs(4) && IF.turnIs(1)',
            effect: function () {
                console.log('BOOM');
                DO.damageAdjacent(3);
            }
        }]        
    },
    {
        'name': 'Giant Spider',
        'type': 'creature',
        'cost': 2,
        'stats': {
            'hp': 4,
            'str': 2
        }
    }
];