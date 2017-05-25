/**
 * Created by Lee on 4/4/2017.
 */
Ext.define('Advertising.view.main.common.promo.PromoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promo',

    requires: [
        'Ext.data.reader.Json'
    ],

    stores: {
        offerItems: {
            listeners: {
                load: function(store, operation) {
                    console.log("Offer items store load");
                }
            },
            autoLoad: false,
            proxy: {
                type : 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read:  Advertising.util.GlobalValues.serviceURL + '/page/getOfferItems'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    data: {
        offerID: -1,
        offerName: 'not set',
        owners: [],
        status: 'not set',
        pageObjectID: -1,
        debug: true,
        debugInfo: 'debug info',
        undoDisabled: true,
        draggable: false,
        showGrid: false,
        width: 350,
        height: 220,
        origX: 0,
        origY: 0
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});