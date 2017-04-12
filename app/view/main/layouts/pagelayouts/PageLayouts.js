/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.main.layouts.pagelayouts.PageLayouts', {
    extend: 'Ext.tab.Panel',


    gridX: 10,
    gridY: 10,
    gridVisible: false,
    xtype: 'pagelayouts',

    requires: [
        'Advertising.view.main.common.Promo',
        'Advertising.view.main.layouts.pagelayouts.PageLayoutsController',
        'Advertising.view.main.layouts.pagelayouts.PageLayoutsModel',
        'Ext.button.Button',
        'Ext.button.Split',
        'Ext.layout.container.Absolute',
        'Ext.panel.Panel'
    ],


    viewModel: {
        type: 'pagelayouts'
    },
    scrollable: true,
    layout: 'absolute',
    controller: 'pagelayouts',
    defaults: {
        bodyPadding: 2
    },
    cls: 'noSelect',
    listeners: {
        resize: 'onPageResize',

        pageChange: 'onPageChange'

    },
    items: [
        {
            closable: true,
            xtype: 'panel',
            bind: {
                title: '{pagename}'
            },
            padding: 10,
            border: true,
            layout: 'absolute', // do not change!
            scrollable: true,

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
                    }
                ]
            },
            items: [
                {
                    xtype: 'image',
                    width: '100%',
                    padding: 10,
                    mode: 'background',
                    zIndex: 1,
                    cls: 'noSelect',
                    src: 'http://laheadvsb01.ngco.com:8881/smartmedia/servlet/smartmediaservlet?ref=RCSS_F_10p5x10p5.indd&type=Page&res=prev'
                },
                {
                    xtype: 'promo',
                    width: 350,
                    height: 220,
                    y: 150,
                    x: 130,
                    name: 'promoY'
                },
                {
                    xtype: 'promo',
                    width: 350,
                    height: 220,
                    y: 150,
                    x: 530,
                    name: 'promoX'

                },
                {
                    xtype: 'promo',
                    width: 350,
                    height: 220,
                    y: 450,
                    x: 530,
                    name: 'promoX'

                }
                ,
                {
                    xtype: 'promo',
                    width: 350,
                    height: 220,
                    y: 650,
                    x: 430,
                    name: 'promoX'

                }

            ]
        }
        /* include child components here */
    ]
});