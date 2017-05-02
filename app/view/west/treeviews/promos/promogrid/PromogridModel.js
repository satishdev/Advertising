/**
 * Created by Lee on 4/6/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promogrid.PromogridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promogrid',

    requires: [
        'Advertising.util.GlobalValues',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    stores: {
        offers: {
            listeners: {
                load: function (store, operation) {
                    console.log("STORE LOAD");
                },

                beforeload: function (store, operation) {
                    //var node = operation.node;
                    //console.log("Adding extra params...%o", node);
                    //store.getProxy().extraParams = {
                    //    nodetype: node.get('nodetype')
                    //};

                }
            },
            autoLoad: false,
            proxy: {
                type: 'rest',
                useDefaultXhrHeader: false,
                pageParam: false, //to remove param "page"
                startParam: false, //to remove param "start"
                limitParam: false, //to remove param "limit"
                noCache: false, //to remove param "_dc"
                api: {
                    read: Advertising.util.GlobalValues.serviceURL + '/event/getVehiclePromoOffers'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'offers'
                }
            }

        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});