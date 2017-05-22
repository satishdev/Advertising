/**
 * Created by Lee on 5/22/2017.
 */
Ext.define('Advertising.view.main.common.model.LayoutObjectModel', {
    extend: 'Ext.data.Model',

    fields: [


        { name: 'xPos',     type: 'number' },
        { name: 'yPos',      type: 'number' },
        { name: 'layoutObjectID',      type: 'int' },

        { name: 'description',    type: 'string' },
        { name: 'width',   type: 'number' },
        { name: 'height', type: 'number' },
        { name: 'section', type: 'string' },
        { name: 'owners', type: 'string' },
        { name: 'theme', type: 'string' },
        { name: 'instructions', type: 'string' },
        { name: 'dirty',    type: 'boolean' }

    ]

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    /*
    Uncomment to add a rest proxy that syncs data with the back end.
    proxy: {
        type: 'rest',
        url : '/users'
    }
    */
});