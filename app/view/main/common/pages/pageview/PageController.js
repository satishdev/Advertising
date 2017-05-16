/**
 * Created by Lee on 4/12/2017.
 *
 * Controller for pages and layouts
 */

Ext.define('Advertising.view.main.common.pages.pageview.PageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page',
    id: 'vcpagecontroller',
    listen: {
        controller: {
            '#vctoolpanelcontroller': {

                showPageMarket: 'onShowPageMarket',
                hidePageMarket: 'onHidePageMarket',
                updatePageZoomLevel: 'onUpdatePageZoomLevel'
            }

        }
    },
    requires: [
        'Advertising.view.main.common.Promo',
        'Advertising.view.main.common.pages.layout.LayoutObject',
        'Ext.container.Container',
        'Ext.layout.container.Absolute',
        'Ext.panel.Panel'
    ],
    colorMap: {},
    /**
     * Called when the view is created
     */
    init: function () {

    },
    /**
     * Show or hide items based on the selected market (adzone, storegroup etc..)
     * @param marketID
     * @param showOffers
     * @param showLayouts
     * @param doShow
     */
    showHideMarket: function (marketID,showOffers, showLayouts, doShow) {
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab().down('panel');
        console.log("Page panel %o", pagePanel);
        pagePanel.items.each(function (pageObject) {
            console.log("Checking page object %o %s", pageObject, pageObject.xtype);
            if (pageObject.xtype == 'promo' || pageObject.xtype == 'layoutobject') {
                console.log("Checking market ID %d", pageObject.getViewModel().get('adzoneID'));

                if (pageObject.getViewModel().get('adzoneID') == marketID) {
                    if (doShow) {
                        // only show given type if the item is supposed to be visible at a higher level
                        if (( showOffers && pageObject.xtype == 'promo' || showLayouts &&  pageObject.xtype == 'layoutobject')) {

                            pageObject.show();
                        }
                        pageObject.excluded = false;
                    } else {
                        pageObject.excluded = true;
                        pageObject.hide();

                    }
                }

            }
        });
    },
    onShowPageMarket: function (marketID, showOffers, showLayouts) {
        var me = this;
        Ext.toast("Show market " + marketID);
        me.showHideMarket(marketID, showOffers, showLayouts, true);

    }
    ,
    onHidePageMarket: function (marketID, showOffers, showLayouts) {
        var me = this;
        Ext.toast("Hide market " + marketID);
        me.showHideMarket(marketID, showOffers, showLayouts, false);
    },
    onUpdatePageZoomLevel: function(zoom) {
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        console.log("Page panel %o", pagePanel);
        pagePanel.setZoom(zoom);
    },
    onPageResize: function (page) {
        Ext.toast("Page was resized " + page.xtype);
        var parentWidth = page.up('panel').getSize().width;
        var parentHeight = page.up('panel').getSize().height;

        var pageWidth = parentWidth ;
        Ext.toast("Width " + parentWidth);
        //  var scale = parentWidth / ((p.inchWidth * 96) + 20);
        var scale = pageWidth / ((page.inchWidth * 96) );
        console.log("Resizing page %d %o %f", parentWidth, page, scale);
        page.setWidth(Math.round(pageWidth));
        page.setHeight(Math.round(page.inchHeight * 96 * scale));
        var svg = page.getEl().query('svg');
        svg[0].setAttribute("width", '' + pageWidth);
        svg[0].setAttribute("height",'' +  Math.round(page.inchHeight * 96 * scale));


        console.log("New Page size %d x %d",page.width, page.height);
    },
    onAddPagePanel: function (p) {


        if (p.xtype == 'layout') {
            return;
        }
        console.log("Parent panel size: %o %s", p.up('panel').getSize(), p.up('panel').xtype);
        var parentWidth = p.up('panel').getSize().width;
        var parentHeight = p.up('panel').getSize().height;
        var pageWidth = parentWidth - 50;
        p.setWidth( pageWidth);
          //  var scale = parentWidth / ((p.inchWidth * 96) + 20);
        var scale = parentWidth / ((p.inchWidth * 96) + 50);
        console.log("Scale %f", scale);
        var me = this;
        me.getViewModel().set("scale", scale);
        var trueWidth = Math.round(p.inchWidth * 96 * scale);
        var trueHeight = Math.round(p.inchHeight * 96 * scale);

        Ext.toast(trueWidth + " X " + trueHeight);
        // This is the panel then then contains all children - layout objects and offers
        var inner = Ext.create('Ext.panel.Panel', {
            border: true,
            flex: 1,
            padding: 0,
            width: pageWidth,
            height: trueHeight,
            layout: 'absolute',

            zIndex: 98,
            listeners: {
                render: 'onRenderPagePanel'
            },
            items: [

                {

                    html: '<svg class="svggrid" width="' + pageWidth + '" height="' + trueHeight + '" xmlns="http://www.w3.org/2000/svg">                    <defs>                    <pattern id="grid' + p.id + '" width="80" height="80" patternUnits="userSpaceOnUse"> <rect width="80" height="80" fill="url(#smallGrid' + p.id + ')"/> <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/> </pattern> </defs> <rect width="100%" height="100%" fill="url(#grid' + p.id + ')" /> </svg>'
                }


            ]
        });
        p.insert(inner);
    },
    setToolMarkets: function (parent, marketInfo) {
        var me = this;

    },
    onRenderPagePanel: function (p) {
        var me = this;
        var parentPanel = p.up('panel');
        console.log("parent %o", parentPanel);
        var scale = parentPanel.getViewModel().get("scale");
        if (parentPanel.hasOwnProperty('objectData')) {
            // get the markets
            console.log("Panel data is %o", parentPanel.objectData);
            if (parentPanel.objectData.hasOwnProperty(('markets'))) {

                me.setToolMarkets(parentPanel, parentPanel.objectData.markets);

            } else {
                Ext.toast("Error", "Failed to get markets for page");
            }
            // add placeholders

            if (parentPanel.objectData.hasOwnProperty('markets')) {
                console.log("Page markets need to adjust toolbars..%o", parentPanel);
            }
            if (parentPanel.objectData.hasOwnProperty(('placeholders'))) {
                var placeholders = parentPanel.objectData.placeholders;
                console.log("Adding placeholders..%o", placeholders);
                placeholders.forEach(function (ph) {
                    console.log("Adding item %o", ph);
                    var panel = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject', {
                        editMode: false,
                        width: ph.width * 96 * scale,
                        height: ph.height * 96 * scale,
                        origX: ph.xPos,
                        origY: ph.yPos,
                        origWidth: ph.width,
                        origHeight: ph.height,
                        x: ph.xPos * 96 * scale,
                        y: ph.yPos * 96 * scale


                    });
                    // set all object properties in model
                    var model = panel.getViewModel();
                    for (var prop in ph) {
                        model.set(prop, ph[prop]);
                    }
                    console.log("New panel %o", panel);
                    p.add(panel);
                });
            }
            if (parentPanel.objectData.hasOwnProperty(('pageObjects'))) {
                var pageObjects = parentPanel.objectData.pageObjects;
                console.log("Items %o", pageObjects);
                // Ext.toast("Adding " + pageObjects.length + " items to layout");
                pageObjects.forEach(function (po) {
                    console.log("Adding item %o", po);
                    var panel = Ext.create('Advertising.view.main.common.Promo', {
                        width: po.width * 96 * scale,
                        height: po.height * 96 * scale,
                        origX: po.xPos,
                        origY: po.yPos,
                        origWidth: po.width,
                        origHeight: po.height,
                        x: po.xPos * 96 * scale,
                        y: po.yPos * 96 * scale

                    });
                    // set all object properties in model
                    var model = panel.getViewModel();
                    for (var prop in po) {
                        model.set(prop, po[prop]);
                    }

                    console.log("New panel %o", panel);
                    p.add(panel);
                });
            } else {
                Ext.toast("No page object on page");
            }
        }
    },
    onRenderLayoutPanel: function (p) {
        var parentPanel = p.up('panel');
        console.log("parent %o", parentPanel);
        var scale = parentPanel.getViewModel().get("scale");
        if (parentPanel.layoutData.hasOwnProperty(('layoutObjectList'))) {
            var layoutObjects = parentPanel.layoutData.layoutObjectList;
            console.log("Items %o", layoutObjects);
            Ext.toast("Adding " + layoutObjects.length + " items to layout");
            layoutObjects.forEach(function (lo) {
                console.log("Adding item %o", lo);
                var panel = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject', {
                    width: Math.round(lo.width * 96 * scale),
                    height: Math.round(lo.height * 96 * scale),
                    origXPos: lo.xPos,
                    origYPos: lo.yPos,
                    origWidth: lo.width,
                    origHeight: lo.height,
                    cellNumber: lo.cellNumber,
                    x: Math.round(lo.xPos * 96 * scale),
                    y: Math.round(lo.yPos * 96 * scale)
                });
                console.log("New panel %o", panel);
                p.insert(panel);
            });
        } else {
            Ext.toast("No layout object on page");
        }
    },
    /**
     * When a layout is requested we'll call this renderer to then populate the data for the layout
     * This renders the inner panel and then the renderer for that paenl in-turn gets the items for the layout
     * @param p
     */
    onAddLayoutPanel: function (p) {

        console.log("Parent panel size: %o", p.up('panel').getSize());
        console.log("Resize page %o %s", p, p.xtype);
          var parentWidth = p.up('panel').getSize().width;
        var parentHeight = p.up('panel').getSize().height;

        var pageWidth = parentWidth ;
        var scale = parentWidth / ((p.inchWidth * 96));
        console.log("Scale %f", scale);
        var me = this;
        me.getViewModel().set("scale", scale);
        var trueWidth = Math.round(p.inchWidth * 96 * scale);
        var trueHeight = Math.round(p.inchHeight * 96 * scale);
        console.log("Real size %f x %f", p.inchWidth, p.inchHeight);
        console.log("-->> New size %f x %f", trueWidth, trueHeight);

        p.setWidth( parentWidth);
        p.setHeight(trueHeight);
        // add SVG grid panel
        var inner = Ext.create('Ext.panel.Panel', {
            border: true,
            //flex: 1,
            padding: 0,
            width: parentWidth,
            height: trueHeight,
            layout: 'absolute',

            zIndex: 98,
            listeners: {
                render: 'onRenderLayoutPanel'
            },
            items: [
                {

                    // todo - get image from server
                    //                     html: '<svg  width="' + parentWidth + '" height="' + trueHeight + '" xmlns="http://www.w3.org/2000/svg">                    <defs>                    <pattern id="smallGrid' + p.id + '" width="8" height="8" patternUnits="userSpaceOnUse">                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/> </pattern> <pattern id="grid' + p.id + '" width="80" height="80" patternUnits="userSpaceOnUse"> <rect width="80" height="80" fill="url(#smallGrid' + p.id + ')"/> <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/> </pattern> </defs> <rect width="100%" height="100%" fill="url(#grid' + p.id + ')" /> </svg>'
                                         html: '<div z-index="999">' + scale + ' Size ' + parentWidth + 'x' + trueHeight + '</div><svg  width="' + parentWidth + '" height="' + trueHeight + '" xmlns="http://www.w3.org/2000/svg">                    <defs>                     <pattern id="grid' + p.id + '" width="80" height="80" patternUnits="userSpaceOnUse"> <rect width="80" height="80" fill="url(#smallGrid' + p.id + ')"/> <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/> </pattern> </defs> <rect width="100%" height="100%" fill="url(#grid' + p.id + ')" /> </svg>'
                }


            ]
        });
        p.insert(inner);
    }
});