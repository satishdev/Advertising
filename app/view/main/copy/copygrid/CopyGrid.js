/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.main.copy.copygrid.CopyGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Advertising.view.main.copy.copygrid.CopyGridController',
        'Advertising.view.main.copy.copygrid.CopyGridModel',
        'Ext.grid.column.Check',
        'Ext.grid.plugin.CellEditing'
    ],
    xtype: 'copygrid',
    initComponent: function() {

        this.callParent();
    },
    selModel: {
        type: 'cellmodel'
    },
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    viewModel: {
        type: 'copygrid'
    },
    title: 'Page A',
    bind: {
        store: '{sample}'
    },
    //header: {
    //    items: [
    //        {
    //            xtype: 'button',
    //            text: 'Product'
    //        },
    //        {
    //            xtype: 'button',
    //            text: 'Promo'
    //        }
    //    ]
    //},
    controller: 'copygrid',
    columns: [
        {
            text: 'Upd Source',
            xtype: 'checkcolumn',
            dataIndex: 'updateSource',

            stopSelection: false

        },
        {
            text: 'UPC',
            dataIndex: 'UPC',

            flex: 1
        },
        {
            text: 'Desc',
            dataIndex: 'description',

            flex: 1
        },
        {
            text: 'Promo',
            dataIndex: 'promo',

            flex: 1
        },
        {
            text: 'Copy Tab',
            dataIndex: 'copyTab',
            flex: 1
        },
        {
            text: 'Language',
            dataIndex: 'language',
            flex: 1
        },
        {
            text: 'Text',
            dataIndex: 'text',
            stopSelection: true,
            editor: {
                allowBlank: false
            },
            flex: 5
        }
    ]
});