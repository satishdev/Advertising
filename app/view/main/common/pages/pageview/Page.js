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
    setZoom: function (zoom) {
        var me = this, model = me.getViewModel();
        Ext.toast("Updating zoom " + zoom);
        me.zoom = zoom;
        var scale = me.getViewModel().get("scale");
        var curZoom = me.zoom;
        console.log("Page info %o", me.getViewModel());
        var newPageWidth = Math.round(((model.get('width') * 96) * scale) * (zoom / 100));
        var newPageHeight = Math.round(((model.get('height') * 96) * scale) * (zoom / 100));
        console.log("new Width and height %d x %d", newPageWidth, newPageHeight);
        var childPanel = me.down('panel');
        childPanel.setWidth(newPageWidth);
        childPanel.setHeight(newPageHeight);

        me.updateGrid();
        me.setDebugInfo();
        // set the zoom and position of the child items
        childPanel.items.each(function (item) {
            if (item.xtype == 'layoutobject' || item.xtype == 'promo') {
                console.log("Updating item size and location %o", item);
                item.setZoom(zoom);
            }
        });
    },
    addNewLayoutObject: function () {

        var me = this;
        Ext.toast("Adding new page object...");
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        var targetPanel = pagePanel.down('panel');
        // add item to the store
        console.log("Adding record to pagePanel %o", pagePanel);
        var store = pagePanel.getViewModel().getStore('layoutObjects');
        var scale = pagePanel.getViewModel().get("scale");
        var pageWidth = pagePanel.getViewModel().get("width");
        var pageHeight = pagePanel.getViewModel().get("height");
        // determine good size for new item based on size of page
        console.log("Scale %o", scale);
        // see if we have an item in this exact position
        // we'll make a new item one 10th of the page size
        var layoutObjectWidth = pageWidth / 10;
        var layoutObjectHeight = pageHeight / 10;
        var nextX = 1, nextY = 1;
        targetPanel.items.each(function (curItem) {
            console.log("Cur %o %f %f", curItem, curItem.xPos, curItem.yPos);
            if (curItem.xPos == nextX || curItem.yPos == nextY) {
                nextX += 0.1;
                nextY += 0.1;
            }
        });
        // add the item to the store
        store.add({
            width: Math.round(layoutObjectWidth * 96 * scale),
            height: Math.round(layoutObjectHeight * 96 * scale),
            origXPos: nextX,
            origYPos: nextY,
            xPos: nextX,
            yPos: nextY,
            origWidth: 2,
            scale: scale,
            origHeight: 3,
            cellNumber: 0,
            x: Math.round(nextX * 96 * scale),
            y: Math.round(nextY * 96 * scale),
            isNew: true
        });
        var layoutObject = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject',
            {
                xtype: 'layoutobject',
                dirty: true,
                width: Math.round(layoutObjectWidth * 96 * scale),
                height: Math.round(layoutObjectHeight * 96 * scale),
                origXPos: nextX,
                origYPos: nextY,
                xPos: nextX,
                yPos: nextY,
                origWidth: 2,
                origHeight: 3,
                scale: scale,
                cellNumber: 0,
                x: Math.round(nextX * 96 * scale),
                y: Math.round(nextY * 96 * scale),
                isNew: true
            });
        targetPanel.insert(layoutObject);
        layoutObject.flagDirty();

    },
    viewModel: {
        type: 'page'
    },

    controller: 'page',

    items: [],
    updateGrid: function () {
        console.log("Updating grid..");
        var me = this;
        var scale = me.getViewModel().get("scale");
        var pageWidth = me.getViewModel().get("width");
        var pageHeight = me.getViewModel().get("height");
        // determine good size for new item based on size of page
        console.log("Scale %o", scale);
        var svg = me.getEl().query('svg')[0];
        //var svg = Ext.dom.Query.select('rect');
        console.log("SVG %o", svg);
        if (svg) {
            svg.setAttribute('width', ( pageWidth * 96 * scale) * (me.zoom/100));
            svg.setAttribute('height', (pageHeight * 96 * scale) * (me.zoom/100));
            var oneInch = Math.round(((96 * scale ) *( me.zoom / 100)));
            console.log("One inch on screen is %f", oneInch);
            console.log("-->> Found grid %o item...updating it", svg);
            var pattern = svg.getElementsByTagName("pattern")[0];
            var path = svg.getElementsByTagName("path")[0];
            console.log("-->> Pattern ", pattern);

            pattern.setAttribute('width',oneInch);
            pattern.setAttribute('height',oneInch);
            pattern.getElementsByTagName('rect')[0].setAttribute('width',oneInch);
            pattern.getElementsByTagName('rect')[0].setAttribute('height',oneInch);

            path.setAttribute('d','M ' + oneInch +' 0 L 0 0 0 ' + oneInch);
            path.setAttribute('width',oneInch);
            path.setAttribute('height',oneInch);
            console.log("-->> Found grid %o item...updated it", svg);

        }

    },
    setDebugInfo: function () {
        var me = this;
        console.log("Setting page debug info ", me);

    }
});