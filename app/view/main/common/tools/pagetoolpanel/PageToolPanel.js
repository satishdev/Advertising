/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.PageToolPanel', {
    extend: 'Ext.window.Window',

    config: {
        showAnimation: {
            type: 'fadeIn'
        },
        hideAnimation: {
            type: 'fadeOut'
        }
    },
    width: 150,
    shadowOffset: 6,

    xtype: 'pagetoolpanel',

    requires: [
        'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelController',
        'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelModel',
        'Ext.button.Button',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel'
    ],


    viewModel: {
        type: 'pagetoolpanel'
    },

    controller: 'pagetoolpanel',
    defaults: {
        xtype: 'button',
        padding: 2,
        margin: 5
    },
    closeAction: 'destroy',
    title: 'Tools',
    listeners: {
        close: 'onToolPanelClose'
    },
    alwaysOnTop: true,
    collapsible: true,
    layout: {
        type: 'vbox',
        //align: 'center',
        pack: 'center'
    },
    items: [
        {
            iconCls: 'fa fa-plus',
            text: 'Add item',
            padding: 5
        },

        {
           xtype:'panel',
            layout: {
                type: 'vbox',
                //align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    enableToggle: true,
                    text: 'Store Group 1'
                },
                {
                    xtype: 'button',
                    enableToggle: true,
                    text: 'Store Group 2'
                },
                {
                    xtype: 'button',
                    enableToggle: true,
                    text: 'Store Group 3'
                }

            ]
        }

    ]
});