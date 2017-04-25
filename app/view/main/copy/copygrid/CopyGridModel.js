/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.main.copy.copygrid.CopyGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.copygrid',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        vehiclecopy: {
            listeners: {
                load: function(store, operation) {
                    console.log("Vehicle copy store load");
                }
            },
            autoLoad: false,
            proxy: {
                type : 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read:  'http://localhost:8881/event/getVehicleCopy'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});