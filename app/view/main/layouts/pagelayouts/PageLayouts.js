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
        'Advertising.view.main.layouts.pagelayouts.PageLayoutsController',
        'Advertising.view.main.layouts.pagelayouts.PageLayoutsModel',
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
        tabchange: 'onPageTabChange',
        added: 'onPageTabAdded',

        pageChange: 'onPageChange'

    },

    items: [
        {
            closable: true,
            xtype: 'panel',
            bind: {
                title: '{welcomeTitle}'
            },
            padding: 10,
            border: true,
            layout: 'absolute', // do not change!

            items: [
                {
                    title:'Welcome to JDA Advertising NG',
                    bind: {
                        html: '{intro}'
                    }
                }

            ]
        }
        /* include child components here */
    ]
});