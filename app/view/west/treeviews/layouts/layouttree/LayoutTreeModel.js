/**
 * Created by Lee on 4/5/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layouttree',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.reader.Json'
    ],

    stores: {
        layouts: {
            listeners: {
                load: function(store, operation) {
                    console.log("Loaded layout store");
                    console.log("Data %o", store);
                }
            },
            type: 'tree',
            autoLoad: true,
            proxy: {
                type : 'ajax',
                useDefaultXhrHeader: false,
                api: {
                    read:  Advertising.util.GlobalValues.serviceURL + '/tree/layouts'
                },
                reader: {
                    type: 'json'
                }
            }
        }
    },

    data: {
        recordID: -111
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});