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
        'Advertising.view.main.common.tools.pagetoolpanel.MarketButton',
        'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelController',
        'Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelModel',
        'Ext.button.Button',
        'Ext.layout.container.Column',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.slider.Single'
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
    collapsed: true,
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },

    items: [
        {
            xtype: 'panel',
            bind: {
                hidden: '{!showToolSplash}',
                html: '{splash}'
            },
            layout: {
                type: 'hbox',
                align : 'stretch',
                pack  : 'start'
            }
        },
        {
            xtype: 'panel',
            bind: {
                hidden: '{!showPageTools}'
            },
            layout:'column',
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
                    tooltip: 'Show/hide Offers',
                    iconCls: 'fa fa-tag',
                    handler: 'onToggleOffers',
                    bind: {
                        pressed: '{showOffers}'
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
                },
                {
                    tooltip: 'Lock/Unlock page movement',
                    iconCls: 'fa fa-lock'
                }
            ]

        },
        {
            xtype: 'slider',
            fieldLabel: 'Zoom',
            labelAlign: 'top',
            //vertical: true,
            width: 100,
            value: 100,
            increment: 10,
            minValue: 0,
            maxValue: 100,
            listeners: {
                changecomplete: 'onZoomChangeComplete'
            }
        },
        {
            iconCls: "fa fa-save",
            handler: 'onSaveChanges',
            text: 'Save',
            padding: 8
        },
        {
            iconCls: 'fa fa-plus',
            text: 'Add item',
            handler: 'onClickAddItem',
            padding: 5
        },
        {
            iconCls: 'fa fa-th',
            text: 'Save layout',
            //handler: 'onClickCreateLayout',
            padding: 5
        },
        {
            iconCls: 'fa fa-users',
            text: 'Owners',
            //handler: 'onClickShowSpaceOwners',
            padding: 5
        },

        {
           xtype:'panel',
            reference: 'marketControls',
            defaults: {
                xtype: 'marketbutton',
                enableToggle: true,
                margin: '1 1 1 1'
            },
            layout: {
                type: 'vbox',
                align : 'stretch',
                pack  : 'start'
            },
            items: [

            ]
        }

    ]
});