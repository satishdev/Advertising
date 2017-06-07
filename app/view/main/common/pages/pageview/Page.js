/**
 * Created by Lee on 4/12/2017.
 *
 * Super class for a layout page or a vehicle page
 */
Ext.define('Advertising.view.main.common.pages.pageview.Page', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Advertising.view.main.common.pages.layout.LayoutObject',
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
                console.log("Updating item size and location %o", item);
                item.setZoom(zoom);
            }
        });
    },
    addNewLayoutObject: function(){

        var me = this;
        Ext.toast("Adding new page object...");
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        var targetPanel = pagePanel.down('panel');
        // add item to the store
        console.log("Adding record to pagePanel %o", pagePanel);
        var store = pagePanel.getViewModel().getStore('layoutObjects');
        var scale = pagePanel.getViewModel().get("scale");
        console.log("Scale %o", scale);
        // see if we have an item in this exact position
        var nextX = 1, nextY = 1;
        targetPanel.items.each(function(curItem) {
            console.log("Cur %o %f %f",curItem, curItem.xPos, curItem.yPos);
            if ( curItem.xPos == nextX || curItem.yPos == nextY) {
                nextX += 0.1;
                nextY += 0.1;
            }
        });
        // add the item to the store
        store.add({
            width: Math.round(2 * 96 * scale),
            height: Math.round(3 * 96 * scale),
            origXPos:  nextX,
            origYPos:  nextY,
            xPos:  nextX,
            yPos:  nextY,
            origWidth: 2,
            scale: scale,
            origHeight: 3,
            cellNumber: 0,
            x:  Math.round(nextX * 96 * scale),
            y:  Math.round(nextY * 96 * scale),
            isNew: true
        });
        var layoutObject = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject',
            {
                xtype: 'layoutobject',
                dirty: true,
                width: Math.round(2 * 96 * scale),
                height: Math.round(3 * 96 * scale),
                origXPos:  nextX,
                origYPos:  nextY,
                xPos:  nextX,
                yPos:  nextY,
                origWidth: 2,
                origHeight: 3,
                scale: scale,
                cellNumber: 0,
                x:  Math.round(nextX * 96 * scale),
                y:  Math.round(nextY * 96 * scale),
                isNew: true
            });
        targetPanel.insert(layoutObject);
        layoutObject.flagDirty();

    },
    viewModel: {
        type: 'page'
    },

    controller: 'page',

    items: [
    ]
});