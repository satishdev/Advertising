/**
 * Created by Lee on 4/12/2017.
 *
 * Super class for a layout page or a vehicle page
 */
Ext.define('Advertising.view.main.common.pages.pageview.Page', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Advertising.view.main.common.pages.layout.LayoutObject',
        'Advertising.view.main.common.pages.pageobject.PageObject',
        'Advertising.view.main.common.pages.pageview.PageController',
        'Advertising.view.main.common.pages.pageview.PageModel',
        'Ext.layout.container.Fit'
    ],
    inchWidth: 0,
    inchHeight: 0,
    padding: 10,
    border: true,
    layout: 'fit',
    scrollable: true,
    xtype: 'page',
    zoom: 100,
    listeners: {
        resize: 'onPageResize',
        render: 'onAddPagePanel'

    },
    addNewLayoutObject: function(){

        var me = this;
        Ext.toast("Adding new page object...");
        var layoutObject = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject',
            {
                width: 300,
                height: 400,
                xPos: 10,
                yPos: 10,
                isNew: true
            });
        me.add(layoutObject);
    },
    viewModel: {
        type: 'page'
    },

    controller: 'page',

    items: [
        /* include child components here */
    ]
});