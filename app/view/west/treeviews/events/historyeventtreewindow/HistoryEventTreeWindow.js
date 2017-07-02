/**
 * Created by leejw_000 on 2017-06-30.
 */
Ext.define('Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindow', {
    extend: 'Ext.window.Window',
    width:600,
    height:400,
    title: 'History Search',
    layout: 'fit',
    modal:true,
    requires: [
        'Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindowController',
        'Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindowModel',
        'Ext.grid.Panel',
        'Ext.layout.container.Fit'
    ],

    listeners: {
        render: 'onRenderWindow'
    },
    viewModel: {
        type: 'historyeventtreewindow'
    },

    controller: 'historyeventtreewindow',

    items: [
        {
            xtype: 'grid',
            layout:'fit',
            selType: 'checkboxmodel',

            bind: {
                store: '{historyEvents}'
            },
            columns: [

                {
                    header: 'Name',
                    dataIndex: 'Name',
                    flex: 2
                },
                {
                    header: 'Start Date',
                    dataIndex: 'StartDate',
                    flex: 2
                },
                {
                    header: 'End Date',
                    dataIndex: 'EndDate',
                    flex: 2

                }
            ]
        }

    ],
    buttons: [
        {
            text: 'Add selected',
            handler: 'onAddSelected'
        }
    ]
});