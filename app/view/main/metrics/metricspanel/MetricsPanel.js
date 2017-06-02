/**
 * Created by Lee on 4/26/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.MetricsPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Advertising.view.main.metrics.metricspanel.MetricsPanelController',
        'Advertising.view.main.metrics.metricspanel.MetricsPanelModel',
        'Ext.layout.container.Fit'
    ],

    xtype: 'metricspanel',
    title: 'Metrics',
    viewModel: {
        type: 'metricspanel'
    },
    layout: 'fit',
    controller: 'metricspanel',
    defaults: {
        flex: 1
    },
    items: [
        //{
        //    html: '<p/>Select a vehicle or page in order to see the associated scorecard data'
        //}
    ]
});