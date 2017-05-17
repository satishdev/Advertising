/**
 * Created by Lee on 5/1/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoproductwindow.PromoProductWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promoproductwindow',

    requires: [
        'Advertising.util.GlobalValues',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        offerItemsWin: {
            listeners: {
                load: function (store, operation) {
                    console.log("Offer items store load");
                }
            },
            autoLoad: false,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read: Advertising.util.GlobalValues.serviceURL + '/page/getOfferItems'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    data: {
        name: 'Not set',
        promoID: -1
    }
});