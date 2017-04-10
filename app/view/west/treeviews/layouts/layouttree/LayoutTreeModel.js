/**
 * Created by Lee on 4/5/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layouttree',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        layouts: {
            listeners: {
                load: function(store, operation) {
                    console.log("STORE LOAD");
                },

                beforeload: function(store, operation){
                    var node = operation.node;
                    console.log("Adding extra params...%o", node);
                    //store.getProxy().extraParams = {
                    //    nodetype: node.get('nodetype')
                    //};

                }
            },
            type: 'tree',
            autoLoad: true,
            proxy: {
                type : 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read:  'http://localhost:8080/layouts/tree'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'events'
                }
            }
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});