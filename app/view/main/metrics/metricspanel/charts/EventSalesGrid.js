/**
 * Created by Lee on 6/1/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.charts.EventSalesGrid', {
    extend: 'Ext.grid.Panel',


    xtype: 'eventsalesgrid',
    title: 'Metrics for ...',

    columns : {
        defaults: {
            sortable: true,
            menuDisabled: true,
            flex: 1
        },
        items: [
            { text: 'Page', dataIndex: 'page' },
            { text: 'Base Sales', dataIndex: 'baseSalesAmount' },
            { text: 'Promoted Sales', dataIndex: 'promotedSalesAmount'},
            { text: 'Promoted Sales MkDown', dataIndex: 'promotedSalesMarkdownAmt'},
            { text: 'Promoted Sales Margin', dataIndex: 'promotedSalesMargin'},

            { text: 'Base Sales Qty', dataIndex: 'baseSalesQuantity'}





        ]
    }
});