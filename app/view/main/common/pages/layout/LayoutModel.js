/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layout',

    requires: [
        'Advertising.util.GlobalValues',
        'Ext.data.reader.Json'
    ],

    stores: {
        layout: {
            storeId: 'layoutStore',
            proxy: {
                type : 'ajax',
                autoLoad: false,
                cors: true,
                useDefaultXhrHeader: false,
                url:  Advertising.util.GlobalValues.serviceURL + '/page/getLayout/',
                reader: {
                    type: 'json'
                }
            }
        },
        layoutObjects: {
            storeId: 'layoutObjectStore',
            proxy: {
                type : 'ajax',
                autoLoad: false,
                cors: true,
                useDefaultXhrHeader: false,
                url:  Advertising.util.GlobalValues.serviceURL + '/page/getLayoutObjects/',
                reader: {
                    type: 'json',
                    rootProperty: 'objects'
                }
            }
        },
        sections: {
            storeId: 'layoutSectionStore',
            proxy: {
                type : 'ajax',
                autoLoad: false,
                useDefaultXhrHeader: false,
                url:  Advertising.util.GlobalValues.serviceURL + '/attributes/getAllSections',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
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
            storeId: 'layoutOwnersStore',
            proxy: {
                type : 'ajax',
                autoLoad: false,
                useDefaultXhrHeader: false,
                url:  Advertising.util.GlobalValues.serviceURL + '/attributes/getAllOwners',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }

    },

    data: {
        scale: 1,
        editMode: true,
        layoutID: -1,
        section: undefined,
        isNew: false,
        cellNumber: 1,
        ownerSelection: undefined,
        debugInfo: '',
        themeCode: '',
        debug: true
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});