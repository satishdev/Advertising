/**
 * Created by leejw_000 on 2017-06-30.
 */
Ext.define('Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.historyeventtreewindow',

    stores: {
        historyEvents: {
            listeners: {
                load: function (store, operation) {
                    console.log("Event history store loaded %o", store.data);
                },

                beforeload: function (store, operation) {

                }
            },
            loadMask: 'Loading history events..',
            autoLoad: false,
            timeout: 1450000,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read: Advertising.util.GlobalValues.serviceURL + '/tree/historyEvents'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'events'
                }
            }

        }
    },

    data: {
        fromDate: null,
        toDate: null
    }
});