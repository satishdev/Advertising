/**
 * Created by Lee on 4/6/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promogrid.PromogridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promogrid',

    requires: [
        'Ext.data.proxy.Ajax',
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
                type: 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read: 'http://localhost:8080/event/getVehiclePromoOffers'
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