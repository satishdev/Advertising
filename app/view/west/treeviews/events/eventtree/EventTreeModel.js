/**
 * Created by Lee on 3/9/2017.
 */

Ext.define('Advertising.view.west.treeviews.events.eventtree.model.Node', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string', mapping: 'text'},
        {name: 'leaf', type: 'boolean', mapping: 'leaf'},
        {name: 'nodetype', type: 'string', mapping: 'nodetype'},
        {name: 'loaded', type: 'boolean', mapping: 'Loaded', defaultValue: false},
        {name: 'Properties'},
        {name: 'expanded', defaultValue: true}
    ]
});


Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eventtree',

    requires: [
        'Advertising.util.GlobalValues',
        'Advertising.view.west.treeviews.events.eventtree.model.Node',
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        events: {
            listeners: {
                load: function (store, operation) {
                    console.log("Event tree store loaded");
                },

                beforeload: function (store, operation) {
                    var node = operation.node;
                    console.log("Adding extra params...%o", node);
                    if ( node.data.hasOwnProperty("nodetype")) {
                        store.getProxy().extraParams = {
                            nodetype: node.get('nodetype')
                        };
                    }

                }
            },
            type: 'tree',
            loadMask: 'Loading events..',
            model: 'Advertising.view.west.treeviews.events.eventtree.model.Node',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read: Advertising.util.GlobalValues.serviceURL + '/tree/events'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'events'
                }
            }

        }
        /*
         A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
         store configuration. For example:

         users: {
         model: 'EventTree',
         autoLoad: true
         }
         */
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});