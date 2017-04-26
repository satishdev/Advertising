/**
 * Created by Lee on 4/26/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.MetricsPanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.metricspanel',

    stores: {
        sample: {
            data: [
                { page: 'Page 1',     sales: 18821700, margin: 2995787},
                { page: 'Page 2',   sales: 91813008, margin: 3611671},
                { page: 'Page 3',   sales: 7156008,  margin: 1640091},
                { page: 'Page 4',      sales: 1700084,  margin: 512506},
                { page: 'Page 5',  sales: 7885600,  margin: 727906 }
            ]

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
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});