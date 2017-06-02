/**
 * Created by Lee on 6/1/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.panel.EventSalesPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Advertising.view.main.metrics.metricspanel.MetricsPanelModel',
        'Ext.layout.container.VBox'
    ],
    viewModel: {
        type: 'metricspanel'
    },
    /*
    Uncomment to give this component an xtype
    xtype: 'eventsalespanel',
    */

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        /* include child components here */
    ]
});