/**
 * Created by Lee on 6/1/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.charts.EventSalesChart', {
    extend: 'Ext.chart.CartesianChart',


    xtype: 'eventsaleschart',

    flex: 4,
    viewModel: {
        type: 'metricspanel'
    },
    layout: 'fit',
    requires: [
        'Advertising.view.main.metrics.metricspanel.MetricsPanelModel',
        'Ext.chart.axis.Category3D',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.series.Bar3D',
        'Ext.layout.container.Fit'
    ],

    width: '100%',
    height: 400,
    //theme: 'Muted',
    insetPadding: '70 40 0 40',
    interactions: ['itemhighlight'],
    animation: {
        duration: 200
    },
    bind: {
     //   store: '{vehicleMetrics}',
        hidden: '{!showEventChart}'
    },

    legend: true,

    axes: [{
        type: 'numeric3d',
        position: 'left',
        fields: ['totalSalesAmount', 'baseSalesAmount', 'margin'],
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
        bind: {
            stacked: '{stacked}'
        },
        title: ['Base Sales', 'Promoted Sales'],
        xField: 'page',
        yField: ['baseSalesAmount', 'promotedSalesAmount'],
        label: {
            field: ['baseSalesAmount', 'promotedSalesAmount'],
            display: 'insideEnd',
            renderer: 'onSeriesLabelRender'
        },
        highlight: true,
        style: {
            inGroupGapWidth: -3
        }
    }

});