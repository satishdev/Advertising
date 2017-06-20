/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.PageToolPanel', {
    extend: 'Ext.panel.Panel',


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
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.slider.Single'
    ],


    viewModel: {
        type: 'pagetoolpanel',
        formulas: {
            hideSplash: function (get) {
                var param = get('mode');
                if (param == 'none' || param =='panel') {
                    return false;
                }
                return true;
            },
            hidePageTools: function (get) {
                var param = get('mode');
                if (param == 'page' || param == 'layout') {
                    return false;
                }
                return true;
            },
            layoutmode: function (get) {
                var param = get('mode');
                if (param == 'layout') {
                    return true;
                }
                return false;
            },
            pagemode: function (get) {
                var param = get('mode');
                if (param == 'page') {
                    return true;
                }
                return false;
            }
        }
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
    setMode: function(mode){

       // Ext.toast("Tool mode "+ mode);
        var me = this;
        me.getViewModel().set('mode',mode);
    },
    items: [
        {
            xtype: 'panel',
            bind: {
                hidden: '{hideSplash}'

            },
            items: [
                {
                    bind: {
                        html: '{splash}'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            bind: {
                hidden: '{!showMetricsTools}'
            },
            layout:'column',
            defaults: {
                xtype: 'button',
                padding: 3,
                margin: 3
            },
            items: [
                {
                    tooltip: 'Show offer data',
                    iconCls: 'fa fa-pie-chart',
                    text: 'Offer Data',
                    handler: 'onShowOfferData'

                },
                {
                    tooltip: 'Show event data',
                    iconCls: 'fa fa-bar-chart',
                    text: 'Event Data',
                    handler: 'onShowEventData'
                },
                //{
                //    tooltip: 'Stack data',
                //    iconCls: 'fa  fa-stack-overflow',
                //    text: 'Stack Data',
                //    enableToggle: true,
                //    handler: 'onToggleStacking'
                //}
                ]
        },
        {
            xtype: 'panel',
            bind: {
                hidden: '{hidePageTools}'
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
                        pressed: '{showOffers}',
                        hidden: '{!pagemode}'
                    }
                },
                {
                    tooltip: 'Show/hide Layouts',
                    iconCls: 'fa fa-newspaper-o',
                    handler: 'onToggleLayouts',
                    bind: {
                        pressed: '{showLayouts}',
                        hidden: '{!pagemode}'
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
            bind: {
                hidden: '{hidePageTools}'
            },
            xtype: 'slider',
            fieldLabel: 'Zoom',
            labelAlign: 'top',
            //vertical: true,
            width: 100,
            value: 100,
            increment: 10,
            minValue: 10,
            maxValue: 200,
            listeners: {
                changecomplete: 'onZoomChangeComplete'
            }
        },
        {
            iconCls: "fa fa-check",
            handler: 'onApprovePage',
            text: 'Approve',
            qtip: 'Approve page for the Promo worklist',

            bind: {
                hidden: '{!pagemode}'
            },
            padding: 8
        },
        {
            iconCls: "fa fa-save",
            handler: 'onSaveChanges',
            text: 'Save',
            bind: {
                hidden: '{hidePageTools}'
            },
            padding: 8
        },
        {
            iconCls: "fa fa-asterisk",
            handler: 'onSaveNew',
            text: 'Save New',
            bind: {
                hidden: '{hidePageTools}'
            },
            padding: 8
        },
        {
            iconCls: 'fa fa-plus',
            text: 'Add item',
            handler: 'onClickAddItem',
            bind: {
                hidden: '{hidePageTools}'
            },
            padding: 5
        },
        {
            iconCls: 'fa fa-object-group',
            text: '* Test Grouping *',
            bind: {
                hidden: '{!pagemode}'
            },
            handler: 'onGroupObjects',
            padding: 5
        },
        {
            iconCls: 'fa fa-th',
            text: 'Save layout',
            bind: {
                hidden: '{!pagemode}'
            },
            //handler: 'onClickCreateLayout',
            padding: 5
        },
        //{
        //    iconCls: 'fa fa-users',
        //    text: 'Owners',
        //    bind: {
        //        hidden: '{hidePageTools}'
        //    },
        //    //handler: 'onClickShowSpaceOwners',
        //    padding: 5
        //},
        {
            iconCls: 'fa fa-th',
            text: 'Grid view',
            //bind: {
            //    hidden: '{!layoutmode}'
            //},
            bind: {
                hidden: '{hidePageTools}'
            },
            handler: 'onShowGridWindow',
            padding: 5
        },
        {
           xtype:'panel',
            bind: {
                hidden: '{!pagemode}'
            },
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