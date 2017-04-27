/**
 * Created by Lee on 4/26/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.MetricsPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Advertising.view.main.metrics.metricspanel.MetricsPanelController',
        'Advertising.view.main.metrics.metricspanel.MetricsPanelModel',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category3D',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.series.Bar3D',
        'Ext.layout.container.Fit'
    ],

    xtype: 'metricspanel',
    layout: 'fit',
    title: 'Metrics',
    viewModel: {
        type: 'metricspanel'
    },

    controller: 'metricspanel',

    items: [
        {
            xtype: 'cartesian',
            width: '100%',
            height: 400,
            //theme: 'Muted',
            insetPadding: '70 40 0 40',
            interactions: ['itemhighlight'],
            animation: {
                duration: 200
            },
            bind: {
                store: '{sample}'
            },

            legend: true,
            //sprites: [{
            //    type: 'text',
            //    text: 'Potential for vehicle <V>',
            //    textAlign: 'center',
            //    fontSize: 18,
            //    fontWeight: 'bold',
            //    width: 100,
            //    height: 30,
            //    x: 325, // the sprite x position
            //    y: 30  // the sprite y position
            //}, {
            //    type: 'text',
            //    text: 'Page comparison',
            //    textAlign: 'center',
            //    fontSize: 16,
            //    x: 325,
            //    y: 50
            //}
            //    , {
            //    type: 'text',
            //    text: 'Source: http://www.w3schools.com/',
            //    fontSize: 10,
            //    x: 12,
            //    y: 495
            //}
            //],
            axes: [{
                type: 'numeric3d',
                position: 'left',
                fields: ['sales', 'margin'],
                grid: true,
                title: 'Sales in USD',
                renderer: 'onAxisLabelRender'
            }, {
                type: 'category3d',
                position: 'bottom',
                fields: 'page',
                title: {
                    text: 'Page',
                    translationX: -30
                },
                grid: true
            }],
            series: {
                type: 'bar3d',
                stacked: false,
                title: ['Total Sales', 'Margin'],
                xField: 'page',
                yField: ['sales', 'margin'],
                label: {
                    field: ['sales', 'margin'],
                    display: 'insideEnd',
                    renderer: 'onSeriesLabelRender'
                },
                highlight: true,
                style: {
                    inGroupGapWidth: -3
                }
            }
        }
    ]
});