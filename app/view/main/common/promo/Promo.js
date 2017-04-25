/**
 * Created by Lee on 4/4/2017.
 */
Ext.define('Advertising.view.main.common.Promo', {
    extend: 'Ext.panel.Panel',
    resizable: true,
    //ui: 'promo',
    xtype: 'promo',
    controller: 'promo',
    viewModel: 'promo',
    requires: [
        'Advertising.view.main.common.promo.PromoController',
        'Advertising.view.main.common.promo.PromoModel',
        'Ext.container.Container',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel'
    ],
    initComponent: function() {
        console.log("Promo object added");
        var me = this;
        this.setupDebug();
        this.callParent();

    },
    //ui: 'promo',
    constrain: true,
    layout: 'fit',
    frame: true,
    zIndex: 99,
    border: 2,
    padding: 0,
    shadow: true,
    draggable: true,
    name: 'promoname',
    cls: 'f-promo-base',
    tbar: {
        items: [
            {
                iconCls: 'fa fa-info',
                enableToggle: true,
                listeners: {
                    click: 'onToggleGrid'
                }
            },
            {
                iconCls: 'fa fa-edit',
                enableToggle: true,
                listeners: {
                    click: 'onShowEdit'
                }
            },
            {
                iconCls: 'fa fa-undo',
                listeners: {
                    click: 'onUndoPromoMove'
                },
                bind: {
                    disabled: '{undoDisabled}'
                }
            },
            {
                style: 'float: right',
                xtype: 'container',
                name: 'debugInfo',
                cls: 'noSelect',
                bind: {
                    html: '{debugInfo}',
                    visible: '{debug}'
                }
            },
            {
                xtype: 'checkboxfield',
                handler: 'onPromoCheckChange'
            }
        ]
    }

    ,
    listeners: {
        move: 'onPromoMove',
        resize: 'onPromoResize',
        render: 'onRenderPromo',
        beforeMove: 'onBeforePromoMove'
    },
    defaults: {
        margin: 2,
        layout: 'fit',
        flex: 1
    },
    items: [
        {
            xtype: 'grid',
            bind: {
                visible: '{showGrid}'
            },
            columns: [
                {
                    text: 'ID'
                },
                {
                    text: 'Desc'
                },
                {
                    text: 'Tmt'
                }
            ]
        },
        {
            html: '<div class="noSelect" style="font-size: 1vw">I am a promo <br/>Some image here</br><p/><div style="font-size: 4vw"> $99<sup style="font-size:.6em">99</sup></div></div>',
            bind: {
                visible: '{!showGrid}'
            }
        }
        /* include child components here */
    ],
    setDebugInfo: function(info) {

        var me = this;
        me.getViewModel().set("debugInfo",info);
        console.log("Model %o", me.getViewModel());

    },
    setupDebug: function() {
        var me = this;
    },
    flagMoved: function() {
        console.debug("Moved promo");
        var me = this;
        me.setStyle("border-color","green");
    }
});