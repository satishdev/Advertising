/**
 * Created by Lee on 5/24/2017.
 */
Ext.define('Advertising.view.main.changecontrol.ChangeControl', {
    extend: 'Ext.grid.Panel',
    title: 'Change Control',
    requires: [
        'Advertising.view.main.changecontrol.ChangeControlController',
        'Advertising.view.main.changecontrol.ChangeControlModel',
        'Ext.grid.filters.Filters'
    ],


    xtype: 'changecontrol',

    layout: 'fit',
    viewModel: {
        type: 'changecontrol'
    },
    stateful: true,

    // Set a stateId so that this grid's state is persisted.
    stateId: 'stateful-changecontrol-grid',
    controller: 'changecontrol',
    bind: {
        store: '{dummyData}'
    },
    plugins: 'gridfilters',
    columns: [
        {
            header: 'Vehicle',
            dataIndex: 'vehicle',
            filter: 'list',
            flex: 2
        },
        {
            header: 'Page',
            dataIndex: 'page',
            filter: 'list',
            flex: 2
        },
        {
            header: 'Promo',
            dataIndex: 'promo',
            flex: 2
        },
        {
            header: 'Change Type',
            dataIndex: 'type',
            filter: 'list',
            flex: 2
        },
        {
            header: 'Original',
            dataIndex: 'oldValue',
            flex: 2
        },
        {
            header: 'New',
            dataIndex: 'newValue',
            flex: 2
        },
        {
            header: 'Last Changed',
            dataIndex: 'lastChange',
            flex: 2
        },
        {
            header: 'Flag complete',
            dataIndex: 'complete',
            flex: 2
        }
    ]
});