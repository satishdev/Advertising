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
        eventMetrics: {

            listeners: {
                load: function (store, operation) {
                    console.log("vehicle metrics store load");
                }
            },
            autoLoad: false,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read: Advertising.util.GlobalValues.serviceURL + '/event/getEventAnalytics'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }


        },

        offerMetrics: {
            listeners: {
                load: function (store, operation) {
                    console.log("offer metrics store load");
                }
            },
            autoLoad: false,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read: Advertising.util.GlobalValues.serviceURL + '/event/getOfferAnalytics'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }

        }

    },

    data: {
        stacked: false,
        showEventData: true,
        showOfferData: false
    }
});