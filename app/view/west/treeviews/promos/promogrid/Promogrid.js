/**
 * Created by Lee on 4/6/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promogrid.Promogrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Advertising.view.west.treeviews.promos.promogrid.PromogridController',
        'Advertising.view.west.treeviews.promos.promogrid.PromogridModel',
        'Ext.grid.column.Action'
    ],


    xtype: 'promogrid',


    viewModel: {
        type: 'promogrid'
    },
    layout:'fit',
    controller: 'promogrid',
    emptyText: 'No offers on selected page/vehicle',
    bind: {
        store: '{offers}'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            sortable: false,
            menuDisabled: false,
            dataIndex: 'status',
            text: 'Status',
            items: [{
                handler: 'onPromoOfferItemClick',
                tooltip: 'Info',
                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                    if (false) {
                        return "x-hide-display";
                    } else {
                        return "x-fa fa-info-circle";
                    }
                }
            }]
        },
        {
            text:'ID',
            flex:1,
            dataIndex: 'ID'
        },
        {
            text:'Name',
            flex:1,
            dataIndex: 'name'
        }
    ]
});