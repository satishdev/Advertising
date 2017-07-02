/**
 * Created by Lee on 3/9/2017.
 */

Ext.define('Advertising.view.west.treeviews.events.eventtree.model.Node', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string', mapping: 'text'},
        {name: 'leaf', type: 'boolean', mapping: 'leaf'},
        {name: 'nodetype', type: 'string', mapping: 'nodetype'},
        {name: 'startdateidx', type: 'number'},
        {name: 'loaded', type: 'boolean', mapping: 'Loaded', defaultValue: false},
        {name: 'Properties'},
        {name: 'expanded', defaultValue: true}
    ]
});


Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eventtree',

    requires: [
        'Advertising.view.west.treeviews.events.eventtree.model.Node',
        'Ext.data.TreeStore',
        'Ext.data.reader.Json'
    ],

    stores: {
        events: {
            listeners: {
                load: function (store, operation) {
                    console.log("Event tree store loaded %o", store.data);
                },

                beforeload: function (store, operation) {
                    var node = operation.node;
                    store.proxy.setTimeout(60000);
                    console.log("Loading event store - Adding extra params...%o", node);
                    if ( node.data.hasOwnProperty("nodetype")) {
                        store.getProxy().extraParams = {
                            nodetype: node.get('nodetype')
                        };
                    }

                }
            },
            folderSort: true,
            type: 'tree',
            loadMask: 'Loading events..',
            model: 'Advertising.view.west.treeviews.events.eventtree.model.Node',
            autoLoad: true,
            timeout: 1450000,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read: Advertising.util.GlobalValues.serviceURL + '/tree/events?vehiclesOnly=true'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'events'
                }
            }

        }

    },

    data: {
        orderIcon: 'fa fa-calendar-plus-o',
        treeOrder: 'date',
        orderTip: 'Order the tree by vehicle date',
        dateSearchIcon: 'fa fa-calendar',
        dateTip: 'Search for historical vehicles',
        searchValue: undefined,
        showNameFilter: true,
        showHistoryFilter: true,
        historyToDate: undefined,
        historyFromDate: undefined
    }
});