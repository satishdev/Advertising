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
        themeCodes: {
            data: [{
                name: 'Theme 1'
            },{
                name: 'Theme 2'
            },{
                name: 'Theme 3'
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
        editMode: true,
        section: undefined,
        isNew: false,
        cellNumber: 1,
        ownerSelection: undefined,
        debugInfo: '',
        debug: true
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});