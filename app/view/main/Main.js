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
        'Ext.button.Split',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.slider.Single',
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
                xtype: 'button',
                iconCls: "fa fa-save",
                handler: 'onSaveChanges'
            },
            {
                xtype: 'button',
                enableToggle: true,

                text: 'Layout',
                handler: 'onToggleLayouts'
            },
            {
                xtype: 'button',
                enableToggle: true,

                text: 'Theme',
                handler: 'onToggleThemes'
            },
            {
                xtype: 'button',
                enableToggle: true,
                text: 'Grid',
                handler: 'onToggleGrid'
            },
            {
                xtype: 'splitbutton',
                text: 'StoreGroup B'
            },
            {
                xtype: 'slider',
                fieldLabel: 'Zoom',
                width: 300,
                increment: 10,
                minValue: 10,
                maxValue: 100,
                labelAlign: 'right',
                cls: 'x-btn-inner-default-small',
                listeners : {
                    change : 'onZoomLevelChange'
                },
                bind: {
                    value: '{zoomValue}'
                }
            },
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
            //width: 200,
            flex: 1,
            xtype: 'treeviews'
        },
        {
            region: 'center',
            collapsible: false,
            layout: 'fit',
            flex: 3,
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
