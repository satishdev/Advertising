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
    listeners: {
        edit: 'onRowChange'
    },
    viewModel: {
        type: 'copygrid'
    },

    bind: {
        store: '{eventcopy}',
        title: '{title}'

    },
    reference: 'copygrid',
    controller: 'copygrid',
    columns: [
        {
            text: 'Upd Source',
            xtype: 'checkcolumn',
            dataIndex: 'updateSource',
            stopSelection: false

        },

        {
            text: 'Promo',
            dataIndex: 'promo',
            flex: 1
        },
        {
            text: 'Role',
            dataIndex: 'role',
            flex: 1
        },
        {
            text: 'Target',
            dataIndex: 'mediaTarget',
            flex: 1
        },
        {
            text: 'Location',
            dataIndex: 'location',
            flex: 1
        },
        {
            text: 'Copy Tab',
            dataIndex: 'tab',
            flex: 1
        },
        {
            text: 'Language',
            dataIndex: 'language',
            flex: 1
        },
        {
            text: 'Text',
            dataIndex: 'copytext',
            stopSelection: true,
            editor: {
                allowBlank: false
            },
            flex: 5
        }
    ]
});