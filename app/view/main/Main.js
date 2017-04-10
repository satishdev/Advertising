/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */




Ext.define('Advertising.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Advertising.view.main.MainController',
        'Advertising.view.main.MainModel',
        'Advertising.view.main.copy.copypanel.CopyPanel',
        'Advertising.view.main.layouts.pagelayouts.PageLayouts',
        'Advertising.view.west.treeviews.TreeViews',
        'Ext.button.Button',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.tab.Panel'
    ],

    controller: 'main',
    viewModel: 'main',
    listeners: {
        render: 'onActivateMain'
    },
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 2
    },
    layout: 'border',

    header: {
        defaults: {
            margin: '0 1 0 5'
        },

        items: [
            {
                text: 'header'
            },
            {
                bind: {
                    text: "Welcome {username}"
                },
                xtype: 'button'
            },

            {
                xtype: 'button',
                text: 'Logout'
            }
        ]
    },
    items: [
        {
            region: 'west',
            width: 200,
            xtype: 'treeviews'
        },
        {
            region: 'center',
            collapsible: false,
            layout: 'fit',
            flex: 1,
            items: [
                {
                    xtype: 'tabpanel',
                    items: [
                        {
                            title: 'Layouts',
                            xtype: 'pagelayouts'
                        },
                        {
                            title: 'Copy',
                            xtype: 'copypanel'
                        }
                    ]
                }
            ]
        }

    ]
});
