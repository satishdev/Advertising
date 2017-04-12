/**
 * Created by Lee on 4/12/2017.
 *
 * Super class for a layout page or a vehicle page
 */
Ext.define('Advertising.view.main.common.pages.pageview.Page', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Advertising.view.main.common.pages.pageview.PageController',
        'Advertising.view.main.common.pages.pageview.PageModel',
        'Ext.layout.container.Fit'
    ],

    border: true,
    layout: 'fit',
    scrollable: true,
    xtype: 'page',
    zoom: 100,
    listeners: {
        resize: 'onPageResize'
    },

    viewModel: {
        type: 'page'
    },

    controller: 'page',

    items: [
        /* include child components here */
    ]
});