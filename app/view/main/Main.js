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
        'Advertising.view.main.metrics.metricspanel.MetricsPanel',
        'Advertising.view.west.treeviews.TreeViews',
        'Ext.button.Button',
        'Ext.button.Split',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.menu.Menu',
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
                iconCls: 'fa fa-wrench',
                tooltip: 'Display context sensitive toolbar',
                handler: 'onShowTools'
            },
            {
                xtype: 'button',
                enableToggle: true,
                iconCls: 'fa fa-newspaper-o',
                text: 'Layout',
                bind: {
                    pressed: '{showLayouts}'
                },
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
                iconCls: "fa fa-th",
                text: 'Grid',
                handler: 'onToggleGrid'
            },
            {
                xtype: 'splitbutton',
                text: 'Store Group A',
                menu: new Ext.menu.Menu({
                    items: [
                        // these will render as dropdown menu items when the arrow is clicked:
                        {text: 'Store Group A', handler: function(){ alert("SG1 clicked"); }},
                        {text: 'Store Group B', handler: function(){ alert("SG2 clicked"); }}
                    ]
                })

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
                listeners: {
                    changecomplete: 'onZoomLevelChange'
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
            },
            {
                iconCls: 'x-fa fa-feed j-status-ok',
                ui: 'header',
                id: 'serviceStatusIcon',
                itemId: 'serviceStatusIcon',
                reference: 'serviceStatusIcon',
                tooltip: 'Server service status'
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
                            title: 'Design',
                            xtype: 'pagelayouts',
                            iconCls: 'fa fa-page',
                            tooltip: 'Display page layouts (templates that<br/> show where promos are to be placed)'

                        },
                        {
                            title: 'Content',
                            xtype: 'copypanel',
                            iconCls: 'fa fa-edit',
                            tooltip: 'Display copy for the vehicle or page<br/> that is selected in the event navigator'

                        },
                        {
                            title: 'Bottom Line',
                            xtype: 'metricspanel',
                            iconCls: 'fa fa-dollar',
                            tooltip: 'Display the metrics for the selected vehicle or page'

                        }
                    ]
                }
            ]
        }

    ]
});
