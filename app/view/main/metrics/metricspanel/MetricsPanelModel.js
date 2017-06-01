/**
 * Created by Lee on 4/26/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.MetricsPanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.metricspanel',

    requires: [
        'Ext.data.reader.Json'
    ],

    stores: {
        vehicleMetrics: {

                listeners: {
                    load: function(store, operation) {
                        console.log("vehicle metrics store load");
                    }
                },
                autoLoad: false,
                proxy: {
                    type : 'ajax',
                    useDefaultXhrHeader: false,
                    api: {
                        read:  Advertising.util.GlobalValues.serviceURL + '/event/getVehicleAnalytics'
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }


        },
        pageMetrics: {


        }
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'MetricsPanel',
            autoLoad: true
        }
        */
    },

    data: {
        stacked: false
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});