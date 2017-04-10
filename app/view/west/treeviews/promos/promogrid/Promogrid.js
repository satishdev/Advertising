/**
 * Created by Lee on 4/6/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promogrid.Promogrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Advertising.view.west.treeviews.promos.promogrid.PromogridModel',
		'Advertising.view.west.treeviews.promos.promogrid.PromogridController'
    ],


    xtype: 'promogrid',


    viewModel: {
        type: 'promogrid'
    },
    layout:'fit',
    controller: 'promogrid',

    columns: [
        {
            text:'Name',
            flex:1,
            dataIndex: 'name'
        }
    ]
});