/**
 * Created by Lee on 4/26/2017.
 */
Ext.define('Advertising.view.main.metrics.metricspanel.MetricsPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.metricspanel',
    listen: {
        controller: {
            '#vceventtreecontroller': {
                eventTreeSelection: 'onEventChange'
            },
            '#vctoolpanelcontroller': {
                showOfferDataChart: 'onShowOfferData',
                showEventDataChart: 'onShowEventData'
            }
        }
    },
    requires: [
        'Advertising.view.main.metrics.metricspanel.charts.EventSalesChart',
        'Advertising.view.main.metrics.metricspanel.charts.OfferDataPie',
        'Ext.util.Format'
    ],

    /**
     * Called when the view is created
     */
    init: function() {

    },
    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        var value = layoutContext.renderer(label) / 1000;
        return value === 0 ? '$0' : Ext.util.Format.number(value, '$0K');
    },
    onShowOfferData: function() {
        Ext.toast("Show offers");
        var metricsPanel = Ext.ComponentQuery.query('metricspanel')[0];
        var me = this;
        var eventTree = Ext.ComponentQuery.query('eventtree')[0];
        var eventTreeModel = eventTree.getViewModel();
        console.log("Event tree %o %o", eventTree, eventTreeModel);
        var nodeType = eventTree.getViewModel().get("selectedEventNode").get("nodetype");
        var objid = eventTree.getViewModel().get("selectedEventNode").get("id");

        Ext.toast("Chart for " + nodeType + " :" + objid);
        //metricsPanel.getViewModel().getStore('offerMetrics').load({
        //   extraParams: {
        //       vehicleID:
        //   }
        //});
        var store = me.getViewModel().getStore('offerMetrics');
        store.getProxy().extraParams = {
            nodeID: objid,
            nodeType: nodeType
        };
        store.load({

            scope: this,
            callback: function (records, operation, success) {
                if ( success) {
                    Ext.toast("Loaded offer store");
                    var chart = Ext.create('Advertising.view.main.metrics.metricspanel.charts.OfferDataPie',{
                        flex: 1,
                        width: '100%',
                        height: 400,
                        padding: 20
                    });
                    chart.bindStore(store);
                    console.log("Adding pie chart to panel");
                    for(var i = 0; i < metricsPanel.items.length; i++)
                    {
                        metricsPanel.remove(metricsPanel.items[i], true);
                    }
                    metricsPanel.insert(0,chart);
                    metricsPanel.update();
                }
            }
        });

    },
    onShowEventData: function() {
        Ext.toast("Show events");
        var metricsPanel = Ext.ComponentQuery.query('metricspanel')[0];
        var me = this;
        var eventTree = Ext.ComponentQuery.query('eventtree')[0];
        var eventTreeModel = eventTree.getViewModel();
        console.log("Event tree %o %o", eventTree, eventTreeModel);
        var nodeType = eventTree.getViewModel().get("selectedEventNode").get("nodetype");
        var objid = eventTree.getViewModel().get("selectedEventNode").get("id");

        Ext.toast("Chart for " + nodeType + " :" + objid);
        //metricsPanel.getViewModel().getStore('offerMetrics').load({
        //   extraParams: {
        //       vehicleID:
        //   }
        //});
        var store = me.getViewModel().getStore('eventMetrics');
        store.getProxy().extraParams = {
            nodeID: objid,
            nodeType: nodeType
        };
        store.load({

            scope: this,
            callback: function (records, operation, success) {
                if ( success) {
                    Ext.toast("Loaded offer store");
                    var chart = Ext.create('Advertising.view.main.metrics.metricspanel.charts.EventSalesChart',{
                        flex: 1,
                        width: '100%',
                        height: 400
                    });
                    chart.bindStore(store);
                    console.log("Adding bar chart to panel");
                    for(var i = 0; i < metricsPanel.items.length; i++)
                    {
                        metricsPanel.remove(metricsPanel.items[i], true);
                    }
                    metricsPanel.insert(0,chart);
                    metricsPanel.update();
                }
            }
        });

    },
    onEventChange: function(record) {
        var me = this;
        var metricsPanel = Ext.ComponentQuery.query('metricspanel')[0];
        if (record.data.nodetype == 'VEHICLE' || record.data.nodetype == 'PAGE') {
            console.log("Event was changed - getting scorecard data %o", record);
            var store = me.getViewModel().getStore('eventMetrics');
            store.getProxy().extraParams = {
                nodeID: record.data.id,
                nodeType: 'VEHICLE'
            };
            store.load({

                scope: this,
                callback: function (records, operation, success) {
                    if (success) {
                        Ext.toast("Loaded analytics");
                        var chart = Ext.create('Advertising.view.main.metrics.metricspanel.charts.EventSalesChart',{
                            flex: 1,
                            width: '100%',
                            height: 400
                        });
                        chart.bindStore(store);
                        console.log("Adding chart to panel");
                        for(var i = 0; i < metricsPanel.items.length; i++)
                        {
                            metricsPanel.remove(metricsPanel.items[i], true);
                        }
                        metricsPanel.insert(0,chart);
                        metricsPanel.update();
                    } else {
                        Ext.toast("Failed to get analytics");
                    }
                }
            });
        }

    },
    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value / 1000, '$0K');
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v, '$0,000');
    }


});