/**
 * Created by Lee on 5/16/2017.
 */
Ext.define('Advertising.view.main.layouts.layoutcreator.LayoutCreatorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layoutcreator',

    requires: [
        'Ext.data.reader.Json'
    ],

    stores: {
        promoTypes: {
            storeId: 'promoTypeStoreCreator',
            proxy: {
                type : 'ajax',
                autoLoad: true,
                useDefaultXhrHeader: false,
                url:  Advertising.util.GlobalValues.serviceURL + '/attributes/getListValues/promotype',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    data: {
        width: 10,
        height: 10,
        gridSize: 0.5,
        promoTypeValue: '',
        promoType: 'Default promo type',
        name: '',
        description: 'Ideally we would let the user pick from a set of templates..e,g [2,3,2],[4,4,4,4]'
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});