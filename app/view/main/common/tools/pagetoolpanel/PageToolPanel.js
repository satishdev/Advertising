/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.PageToolPanel', {
    extend: 'Ext.panel.Panel',

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
    zIndex: 10,
    xtype: 'pagetoolpanel',

    requires: [
        'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelController',
        'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelModel',
        'Ext.button.Button',
        'Ext.layout.container.HBox',
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
        align : 'stretch',
        pack  : 'start'
    },
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align : 'stretch',
                pack  : 'start'
            },
            defaults: {
                xtype: 'button',
                padding: 3,
                margin: 1,
                enableToggle: true
            },
            items: [
                {
                    tooltip: 'Show/hide Grid',
                    iconCls: 'fa fa-th',
                    handler: 'onToggleGrid',
                    bind: {
                        pressed: '{showGrids}'
                    }
                },
                {
                    tooltip: 'Show/hide Layouts',
                    iconCls: 'fa fa-newspaper-o',
                    handler: 'onToggleLayouts',
                    bind: {
                        pressed: '{showLayouts}'
                    }
                },
                {
                    tooltip: 'Show/hide Images',
                    iconCls: 'fa fa-camera'
                }
            ]

        },
        {
            iconCls: 'fa fa-plus',
            text: 'Add item',
            padding: 5
        },
        {
            iconCls: 'fa fa-new',
            text: 'Create new layout',
            //handler: 'onClickCreateLayout',
            padding: 5
        },
        {
            iconCls: 'fa fa-users',
            text: 'Space owners',
            //handler: 'onClickShowSpaceOwners',
            padding: 5
        },

        {
           xtype:'panel',
            layout: {
                type: 'vbox',
                align : 'stretch',
                pack  : 'start'
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
                ,
                {
                    xtype: 'button',
                    enableToggle: true,
                    text: 'Store Group 4'
                },
                {
                    xtype: 'button',
                    enableToggle: true,
                    text: 'Store Group 5'
                }
            ]
        }

    ]
});