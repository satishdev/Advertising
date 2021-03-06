/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layout',

    requires: [
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
          //  model: 'Advertising.view.main.common.model.LayoutObjectModel',
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
        sectionStore: {
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
        positions: {
            data: [{
                name: 'Pos 1'
            },{
                name: 'Pos 2'
            },{
                name: 'Pos 3'
            }

            ]
        },
        themeCodes: {
            data: [{
                name: 'Canada Day 97'
            },{
                name: 'Ethnic'
            },{
                name: 'Theme 3'
            }

            ]
        },
        promoTypes: {
            storeId: 'promoTypeStore',
            proxy: {
                type : 'ajax',
                autoLoad: false,
                useDefaultXhrHeader: false,
                url:  Advertising.util.GlobalValues.serviceURL + '/attributes/getListValues/promotype',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        ownersStore: {
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
        objid:-1,
        groupID:-1,
        layoutID: -1,
        section: undefined,
        firstLayout: true,
        layoutMode: true,
        isNew: false,
        cellNumber: 1,
        ownerSelection: undefined,
        ownerList: 'No owner',
        debugInfo: '',
        themeCode: '',
        debug: true,
        sectionSelection: 'No header',
        themeName: 'Theme Code',
        promoTypeLabel: 'Promo Type',
        sectionName: 'Header',
        adPosition: 'Ad Position'
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});