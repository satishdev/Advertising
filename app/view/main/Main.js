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
        'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanel',
        'Advertising.view.main.copy.copypanel.CopyPanel',
        'Advertising.view.main.layouts.pagelayouts.PageLayouts',
        'Advertising.view.main.metrics.metricspanel.MetricsPanel',
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
              xtype: 'image',
                src: 'resources/images/jda/company_logo.png',
                imgCls: 'f-company-logo',
                height: 40
            },


            {
                bind: {
                    text: "Welcome {username}"
                },
                xtype: 'button',
                handler: function() {
                    Ext.Msg.prompt(
                        'test',
                        'Enter some value',
                        function (buttonId, value) {
                            console.log(value);
                        },
                        null,
                        false,
                        null,
                        {
                            autoCapitalize: true,
                            placeHolder: 'Value please...'
                        }
                    );
                }
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
            xtype: 'treeviews',
            collapsible: true
        },
        {
            title: 'Tools',
            region:'east',
            xtype: 'pagetoolpanel',
            reference: 'mainToolPanel',
            floatable: false,
            bind: {
                collapsed: '{!showTools}'
            },
            margin: '0 0 0 0',
            width: 125,
            minWidth: 100,
            maxWidth: 250


        },
        {
            region: 'center',
            collapsible: false,
            margin: '0 0 0 0',
            layout: 'fit',
            flex: 5,
            items: [
                {
                    xtype: 'tabpanel',

                    items: [
                        {
                            title: 'Layout Design',
                            xtype: 'pagelayouts',
                            reference: 'pagelayouts',
                            iconCls: 'fa fa-tag',
                            tooltip: 'Display page layouts (templates that<br/> show where promos are to be placed)'

                        },
                        {
                            title: 'Marketing Content',
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
