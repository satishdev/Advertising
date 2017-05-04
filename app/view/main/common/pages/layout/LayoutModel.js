/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layout',

    stores: {
        sections: {
            data: [{
                name: 'Unico'
            },{
                name: 'Meat'
            },{
                name: 'T&T'
            }

            ]
        },
        owners: {
            data: [
                {
                    name: 'Grocery',
                    category: 'g'
                },
                {
                    name: 'Dairy',
                    category: 'd'
                },
                {
                    name: 'Meat',
                    category: 'm'
                },
                {
                    name: 'Frozen',
                    category: 'f'
                }
            ]
        }

    },

    data: {
        scale: 1,
        section: undefined,
        ownerSelection: undefined
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});