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
    setZoom: function(zoom) {
        var me = this;
        Ext.toast("Updating zoom " + zoom);
        me.zoom = zoom;
        var curZoom = me.zoom;
        var realZoom = 100 - curZoom + zoom;
        var curWidth = me.getWidth();
        var curHeight = me.getHeight();
        var childPanel = me.down('panel');
        childPanel.setWidth(curWidth * (realZoom/ 100));
        childPanel.setHeight(curHeight * ( realZoom/100));
        // set the zoom and position of the child items
        childPanel.items.each(function(item) {
            if ( item.xtype == 'layoutobject' || item.xtype == 'promo') {
                item.setZoom(zoom);
            }
        });
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
    ]
});