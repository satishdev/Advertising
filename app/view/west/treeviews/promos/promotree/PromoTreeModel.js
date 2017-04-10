/**
 * Created by Lee on 3/22/2017.
 */

Ext.define('Advertising.view.west.treeviews.promos.promotree.model.Node', {
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


Ext.define('Advertising.view.west.treeviews.promos.promotree.PromoTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promotree',

    requires: [
        'Advertising.view.west.treeviews.promos.promotree.model.Node',
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {

        promos: {
            listeners: {
                load: function (store, operation) {
                    console.log("STORE LOAD");
                },

                beforeload: function (store, operation) {
                    var node = operation.node;
                    console.log("Adding extra params...%o", node);
                    store.getProxy().extraParams = {
                        nodetype: node.get('nodetype')
                    };

                }
            },
            type: 'tree',
            model: 'Advertising.view.west.treeviews.promos.promotree.model.Node',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read: 'http://localhost:8080/tree/promos'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'promos'
                }
            }

        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});