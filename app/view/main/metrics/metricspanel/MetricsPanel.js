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
        'Ext.layout.container.Table'
    ],

    xtype: 'metricspanel',
    title: 'Metrics',
    viewModel: {
        type: 'metricspanel'
    },
    layout: {
        type: 'table',
        columns: 2,
        tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },
    controller: 'metricspanel',

    items: [
        {

            xtype: 'cartesian',
            width: '100%',
            height:400,
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
        },
        {
            xtype: 'cartesian',
            width: '100%',
            height:400,
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
        },
        {
            xtype: 'cartesian',
            width: '100%',
            height:400,
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
        },     {
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