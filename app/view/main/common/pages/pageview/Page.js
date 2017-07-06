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
    setGridSize: function (size) {
        Ext.toast("Setting grid to " + size);
        var me = this;
        var scale = me.getViewModel().get("scale");
        var oneInch = Math.round(((96 * scale ) * ( me.zoom / 100)));
        var newSize = Math.round(oneInch * size);
        // update the grid size
        var svg = me.getEl().query('svg')[0];
        //var svg = Ext.dom.Query.select('rect');
        console.log("SVG %o Inch = %f New = %f", svg, oneInch, newSize);
        if (svg) {
            var pattern = svg.getElementsByTagName("pattern")[0];
            var path = svg.getElementsByTagName("path")[0];
            console.log("-->> Pattern ", pattern);

            pattern.setAttribute('width', newSize);
            pattern.setAttribute('height', newSize);
            pattern.getElementsByTagName('rect')[0].setAttribute('width', newSize);
            pattern.getElementsByTagName('rect')[0].setAttribute('height', newSize);

            path.setAttribute('d', 'M ' + newSize + ' 0 L 0 0 0 ' + newSize);
            path.setAttribute('width', newSize);
            path.setAttribute('height', newSize);
        }
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

        me.updateGrid(me);
        me.setDebugInfo();
        // set the zoom and position of the child items
        childPanel.items.each(function (item) {
            if (item.xtype == 'layoutobject' || item.xtype == 'promo') {
                console.log("Updating item size and location %o", item);
                //   me.fireEvent('onZoomChange', item);
                item.setZoom(zoom);
            }
        });
    },
    addNewLayoutObject: function (sourceModelData) {

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
        var layoutObjectWidth = pageWidth / 4;
        var layoutObjectHeight = pageHeight / 4;
        var nextX = 1, nextY = 1;
        var zIndex = 1;
        var nextCell = 0;
        targetPanel.items.each(function (curItem) {
            console.log("Cur %o %f %f", curItem, curItem.xPos, curItem.yPos);
            if (  curItem.xtype == 'layoutobject') {
                if ( curItem.getViewModel().get('cellNumber') > nextCell) {
                    nextCell = curItem.getViewModel().get('cellNumber');
                }
            }
            if (curItem.xPos == nextX || curItem.yPos == nextY) {
                nextX += 0.1;
                nextY += 0.1;
            }
            zIndex = curItem.zIndex;
        });
        // increment next cell number
        nextCell++;
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
            cellNumber: nextCell,
            x: Math.round(nextX * 96 * scale),
            y: Math.round(nextY * 96 * scale),
            isNew: true,
            zIndex: zIndex + 1
        });
        var layoutObject = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject',
            {
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
                cellNumber: nextCell,
                x: Math.round(nextX * 96 * scale),
                y: Math.round(nextY * 96 * scale),
                isNew: true,
                zIndex: zIndex + 1
            });
        targetPanel.insert(layoutObject);
        if ( sourceModelData ) {
            var targetModel = layoutObject.getViewModel();
            console.log("Copying data from source %o %o", targetModel, sourceModelData);
            targetModel.setData(sourceModelData);
            // make sure object id not set
            targetModel.set('objid',-1);
            targetModel.set('cellNumber',nextCell);
            for ( var field in sourceModelData ) {
                var comp =  layoutObject.lookupReference(field);

                if ( comp ) {
                    comp.setValue(sourceModelData[field]);
                }

            }


        }
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
        var pageWidth = me.getViewModel().get("width");
        var pageHeight = me.getViewModel().get("height");
        var parentWidth = me.getSize().width;
        var parentHeight = me.getSize().height;
        var zoom =  Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('zoom') / 100;
   //     var scale = me.getViewModel().get("scale");
        var scale = parentWidth / ((pageWidth * 96) + 50);
        var oneInch = Math.round(((96 * scale ) * zoom));

        // determine good size for new item based on size of page
        console.log("--->>>  Scale %o ZOOM %f", scale,zoom);
        var svg = me.getEl().query('svg')[0];
        //var svg = Ext.dom.Query.select('rect');
        console.log("SVG %o", svg);
        if (svg) {
            svg.setAttribute('width', Math.round(pageWidth * oneInch));
            svg.setAttribute('height', Math.round( pageHeight * oneInch ));
            console.log("One inch on screen is %f", oneInch);
            console.log("-->> Found grid %o item...updating it", svg);
            var pattern = svg.getElementsByTagName("pattern")[0];
            var path = svg.getElementsByTagName("path")[0];
            console.log("-->> Pattern ", pattern);

            pattern.setAttribute('width', oneInch);
            pattern.setAttribute('height', oneInch);
            pattern.getElementsByTagName('rect')[0].setAttribute('width', oneInch);
            pattern.getElementsByTagName('rect')[0].setAttribute('height', oneInch);

            path.setAttribute('d', 'M ' + oneInch + ' 0 L 0 0 0 ' + oneInch);
            path.setAttribute('width', oneInch);
            path.setAttribute('height', oneInch);
            console.log("-->> Found grid %o item...updated it", svg);

        }

    },
    setDebugInfo: function () {
        var me = this;
        console.log("Setting page debug info ", me);

    }
});