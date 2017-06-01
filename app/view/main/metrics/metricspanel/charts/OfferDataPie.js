/**
 * Created by Lee on 6/1/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.charts.OfferDataPie', {
    extend: 'Ext.chart.PolarChart',

    requires: [
        'Advertising.view.main.metrics.metricspanel.charts.OfferDataController',
        'Ext.chart.series.Pie3D'
    ],
    controller: 'offerdata',

    xtype: 'offerdatapie',
    bind: {
        store: '{offerMetrics}',
        hidden: '{!showOfferChart}'
    },
    series: [
        {
            type: 'pie3d',
            angleField: 'baseSalesAmount',
            donut: 30,
            distortion: 0.6,
            highlight: {
                margin: 40
            },
            label: {
                field: 'offer'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }
    ]
});