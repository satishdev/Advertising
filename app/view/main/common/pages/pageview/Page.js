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
        var curWidth = me.getWidth();
        var curHeight = me.getHeight();
        var childPanel = me.down('panel');
        childPanel.setWidth(curWidth * (zoom/ 100));
        childPanel.setHeight(curHeight * ( zoom/100));
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
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        var scale = pagePanel.getViewModel().get("scale");
        console.log("Scale %o", scale);
        // add the item to the store
        pagePanel.getViewModel().getStore('layoutObjects').add({
            width: Math.round(2 * 96 * scale),
            height: Math.round(4 * 96 * scale),
            origXPos: 50,
            origYPos: 50,
            origWidth: 300,
            origHeight: 300,
            cellNumber: 0,
            x: 50,
            y: 50,
            isNew: true
        });
        var layoutObject = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject',
            {
                width: Math.round(2 * 96 * scale),
                height: Math.round(4 * 96 * scale),
                origXPos: 50,
                origYPos: 50,
                origWidth: 300,
                origHeight: 300,
                cellNumber: 0,
                x: 50,
                y: 50,
                isNew: true
            });
        pagePanel.down('panel').insert(layoutObject);
        layoutObject.flagDirty();

    },
    viewModel: {
        type: 'page'
    },

    controller: 'page',

    items: [
    ]
});