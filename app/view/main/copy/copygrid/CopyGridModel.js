/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.main.copy.copygrid.CopyGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.copygrid',

    requires: [
        'Ext.data.reader.Json'
    ],

    stores: {
        eventcopy: {
            listeners: {
                load: function(store, operation) {
                    console.log("Event copy store load");
                }
            },
            autoLoad: false,
            proxy: {
                type : 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read:  Advertising.util.GlobalValues.serviceURL + '/event/getEventCopy'
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