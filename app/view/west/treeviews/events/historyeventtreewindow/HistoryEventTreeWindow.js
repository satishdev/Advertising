/**
 * Created by leejw_000 on 2017-06-30.
 */
Ext.define('Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindow', {
    extend: 'Ext.window.Window',
    width:400,
    height:300,
    title: 'History Search',
    modal:true,
    requires: [
        'Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindowModel',
		'Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindowController'
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
            bind: {
                store: '{historyEvents}'
            },
            columns: [
                {
                    xtype: 'checkcolumn'

                },
                {
                    header: 'Name'
                },
                {
                    header: 'Start Date'
                },
                {
                    header: 'End Date'
                }
            ]
        }

    ],
    buttons: [
        {
            text: 'Add selected'
        }
    ]
});