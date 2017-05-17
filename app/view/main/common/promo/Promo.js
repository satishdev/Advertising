/**
 * Created by Lee on 4/4/2017.
 */
Ext.define('Advertising.view.main.common.Promo', {
    extend: 'Advertising.view.main.common.pages.pageobject.PageObject',
    resizable: true,
    //ui: 'promo',
    xtype: 'promo',
    controller: 'promo',
    viewModel: {
        type: 'promo'
    },

    requires: [
        'Advertising.view.main.common.promo.PromoController',
        'Advertising.view.main.common.promo.PromoModel',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel'
    ],
    initComponent: function () {
        console.log("Promo object added");
        var me = this;
        this.setupDebug();
        this.callParent(arguments);
    },
    excluded: false,
    //ui: 'promo',
    constrain: true,
    layout: 'fit',
    frame: true,
    border: 2,
    padding: 0,
    shadow: true,

    draggable: true,

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

    defaults: {
        margin: 2,
        layout: 'fit',
        flex: 1
    },
    items: [

        {
            xtype: 'grid',
            width: 250,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button', iconCls: 'fa fa-expand', handler: 'onExpandGrid'
                        }
                    ]
                }
            ],
            bind: {
                visible: '{showGrid}',
                store: '{offerItems}'
            },
            columns: [
                {
                    text: 'Product',
                    dataIndex: 'productID',
                    flex: 2
                },
                {
                    text: 'Qty',
                    dataIndex: 'quantity',
                    flex: 1

                },
                {
                    text: 'Desc',
                    dataIndex: 'description',
                    hidden: true,
                    flex: 3

                },
                {
                    text: 'Tmt',
                    dataIndex: 'treatment',
                    hidden: true,
                    flex: 1
                }
            ]
        },
        {
            // html: '<div class="noSelect" style="font-size: 1vw">' + '{name}' + '<br/>Some image here</br><p/><div style="font-size: 4vw"> $99<sup style="font-size:.6em">99</sup></div></div>',
            bind: {
                html: '<div class="noSelect" style="font-size: 1vw">{name}<br/><div class="f-prod-image"><img class="noSelect" src="http://laheadvsb01.ngco.com:8080/smartmedia/servlet/smartmediaservlet?ref=4122006805.eps&type=Image&res=thumb"/></div></br><p/>Adzone [{adzoneID} {location}]</div>',
                visible: '{!showGrid}'
            }
        }
        /* include child components here */
    ],

    setupDebug: function () {
        var me = this;
    },

});