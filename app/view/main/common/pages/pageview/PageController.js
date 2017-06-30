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
                updatePageZoomLevel: 'onUpdatePageZoomLevel',
                updatepageGridSize: 'onUpdatePageGridSize'
            }

        }
    },
    requires: [
        'Advertising.view.main.common.Promo',
        'Advertising.view.main.common.pages.layout.LayoutObject',
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
    showHideMarket: function (marketID, showOffers, showLayouts, doShow) {
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab().down('panel');
        console.log("Page panel %o", pagePanel);
        pagePanel.items.each(function (pageObject) {
            console.log("Checking page object %o %s", pageObject, pageObject.xtype);
            if (pageObject.xtype == 'promo' || pageObject.xtype == 'layoutobject') {
                console.log("Checking market ID %d", pageObject.getViewModel().get('adzoneID'));

                if (pageObject.getViewModel().get('adzoneID') == marketID) {
                    if (doShow) {
                        // only show given type if the item is supposed to be visible at a higher level
                        if (( showOffers && pageObject.xtype == 'promo' || showLayouts && pageObject.xtype == 'layoutobject')) {

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
    onUpdatePageZoomLevel: function (zoom) {
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        console.log("Page panel %o", pagePanel);
        // todo - handle this in the controller here and fire events to child objects
        pagePanel.setZoom(zoom);
    },

    onUpdatePageGridSize: function (size) {
        var pagePanel = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab();
        console.log("Page panel %o", pagePanel);
        // todo - handle this in the controller here and fire events to child objects
        pagePanel.setGridSize(size);
    },
    savePage: function (page) {

    },
    onPageResize: function (page) {
        //    Ext.toast("Page was resized " + page.xtype);
        var parentWidth = page.up('panel').getSize().width;
        var parentHeight = page.up('panel').getSize().height;
        var model = page.getViewModel();
        var pageWidth = parentWidth;
        //   Ext.toast("Width " + parentWidth);
        console.log("Assigning scale based on %f %f", model.get("width"), pageWidth);
        //  var scale = parentWidth / ((p.inchWidth * 96) + 20);
        var scale = pageWidth / ((model.get("width") * 96) );
        console.log("Resizing page %d %o %f", parentWidth, page, scale);
        page.setWidth(Math.round(pageWidth));
        page.setHeight(Math.round(model.get("height") * 96 * scale));
        var svg = page.getEl().query('svg');
        svg[0].setAttribute("width", '' + pageWidth);
        console.log("Model height: %o", model);
        svg[0].setAttribute("height", '' + Math.round(model.get("height") * 96 * scale));


        console.log("New Page size %d x %d", model.get("width"), model.get("height"));
    },
    onAddPagePanel: function (p) {


        if (p.xtype == 'layout') {
            return;
        }
        console.log("Parent panel size: %o %s", p.up('panel').getSize(), p.up('panel').xtype);
        var parentWidth = p.up('panel').getSize().width;
        var parentHeight = p.up('panel').getSize().height;
        var pageWidth = parentWidth - 50;
        p.setWidth(pageWidth);
        //  var scale = parentWidth / ((p.inchWidth * 96) + 20);
        var scale = parentWidth / ((p.inchWidth * 96) + 50);
        console.log("Scale %f", scale);
        var me = this;

        var trueWidth = Math.round(p.inchWidth * 96 * scale);
        var trueHeight = Math.round(p.inchHeight * 96 * scale);
        me.getViewModel().set("scale", scale);
        me.getViewModel().set("width", p.inchWidth);
        me.getViewModel().set("height", p.inchHeight);
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

                    html: '<svg class="svggrid" width="' + pageWidth + '" height="' + trueHeight + '" xmlns="http://www.w3.org/2000/svg">                    <defs>                    <pattern id="grid' + p.id + '" width="' + 98 * scale + '" height="' + 98 * scale + '" patternUnits="userSpaceOnUse"> <rect width="' + 98 * scale + '" height="' + 98 * scale + '" fill="url(#smallGrid' + p.id + ')"/> <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/> </pattern> </defs> <rect width="' + pageWidth + '" height="' + trueHeight + '" fill="url(#grid' + p.id + ')" /> </svg>'
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
                        objid: ph.objid,
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
            var i = 0;
            if (parentPanel.objectData.hasOwnProperty(('pageObjects'))) {
                var pageObjects = parentPanel.objectData.pageObjects;

                console.log("Items %o", pageObjects);
                // Ext.toast("Adding " + pageObjects.length + " items to layout");
                pageObjects.forEach(function (po) {
                    console.log("Adding item %o", po);
                    i++;
                    var panel = Ext.create('Advertising.view.main.common.Promo', {
                        width: po.width * 96 * scale,
                        height: po.height * 96 * scale,
                        objid: po.objid,
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
                    model.set('offerName', 'test ' + i);

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
        parentPanel.mask('Loading layout objects...');

        console.log("parent %o", parentPanel);
        var scale = parentPanel.getViewModel().get("scale");
        var store = parentPanel.getViewModel().getStore('layoutObjects');
        store.getProxy().url = Advertising.util.GlobalValues.serviceURL + '/page/getLayoutObjects/' + parentPanel.getViewModel().get('objid');
        // keep track of the stores for the first object added so we dont have to do the network trip for all the stores
        var firstLayoutObj = {}, loadStores = true;
        store.load({

                scope: this,
                callback: function (records, operation, success) {
                    if (success) {
                        console.log("Layout object data loaded..%o", records);

                        store.each(function (rec) {
                            var data = rec.data;

                            console.log("Layout object data is %o", rec.data);
                            console.log("Adding object %o %f", rec, scale);
                            console.log("OBJECT ID ", data.objid);

                            var layoutObject = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject', {
                                width: Math.round(data.width * 96 * scale),
                                height: Math.round(data.height * 96 * scale),
                                origX: data.xPos,
                                origY: data.yPos,
                                origWidth: data.width,
                                origHeight: data.height,
                                cellNumber: data.cellNumber,
                                loadStores: loadStores,
                                dirty:false,
                                objid: data.objid,
                                layoutObjectID: data.objid,
                                x: Math.round(data.xPos * 96 * scale),
                                y: Math.round(data.yPos * 96 * scale)
                            });



                            console.log("Adding panel item %o", layoutObject);

                            p.insert(layoutObject);

                            layoutObject.flagClean();
                            var stores = layoutObject.getViewModel().storeInfo;

                            if ( Ext.Object.isEmpty(firstLayoutObj)) {
                              //  firstLayoutObj = layoutObject;
                                //console.log("Saving store info from first object");
                                //console.log("Stores %o", stores);
                                for ( var store in stores ) {
                                    console.log("Loading store %o", stores[store]);
                                    if ( stores[store].storeId ==='layoutStore' || stores[store].storeId==='layoutObjectStore') {

                                    } else {
                                        stores[store].load({});
                                    }
                                }

                            } else {

                                for ( var store in stores ) {
                                    //layoutObject.getViewModel().getStore(store).setData(firstLayoutObj.getViewModel().getStore(store).data);
                                    firstLayoutObj.getViewModel().getStore(store).each(function(r){
                                       console.log("Adding record to target %o", r);
                                        layoutObject.getViewModel().getStore(store).add(Ext.encode(r.data));
                                    });
                                }
                            }

                                layoutObject.getViewModel().set('objid',rec.data['objid']);


                            for (var prop in rec.data) {

                                layoutObject.items.each(function(field) {
                                    if ( field.name == prop) {
                                        field.setValue(rec.data[prop]);
                                    }
                                });
                            //    console.log("Setting prop %o to %o", prop, rec.data[prop]);
                                if (layoutObject.getViewModel().getStore(prop)) {
                                    console.log("We have a matching store for %s - seeing if we can set selected value", prop);

                                    layoutObject.items.each(function (item) {
                                        if (item.name == prop) {
                                           try {

                                               var itemObj = Ext.decode(rec.data[prop]);
                                       //        console.log("Setting %o to %o", item, itemObj.id);
                                               item.setValue(itemObj.id);
                                           } catch (err ) {
                                               // do nothing
                                           }
                                        } else {
                                            //if (item.xtype == 'textarea') {
                                            //
                                            //    item.setValue(rec.data[prop]);
                                            //}
                                        }
                                    });
                                }
                            }

                            for ( var prop in data ) {
                                    if (! layoutObject.getViewModel().hasOwnProperty(prop)) {
                                        layoutObject.getViewModel().set(prop, data[prop]);
                                    }
                            }

                            layoutObject.setDebugInfo();

                        });
                        parentPanel.unmask();
                    } else {
                        console.log('error');
                    }
                }
            }
        );
    },

    /**
     * When a layout is requested we'll call this renderer to then populate the data for the layout
     * This renders the inner panel and then the renderer for that paenl in-turn gets the items for the layout
     * @param p
     */
    onAddLayoutPanel: function (p) {


        console.log("Parent panel size: %o", p.up('panel').getSize());
        console.log("Resize page %o %s %o", p, p.xtype, p.getViewModel());
        var parentWidth = p.up('panel').getSize().width;
        var parentHeight = p.up('panel').getSize().height;

        var pageWidth = parentWidth;
        var scale = parentWidth / ((p.getViewModel().get("width") * 96));
        var model = p.getViewModel();
        console.log("Scale %f", scale);
        var me = this;
        me.getViewModel().set("scale", scale);
        var trueWidth = Math.round(model.get("width") * 96 * scale);
        var trueHeight = Math.round(model.get("height") * 96 * scale);
        console.log("Real size %f x %f", model.get("width"), model.get("height"));
        console.log("-->> New size %f x %f", trueWidth, trueHeight);
        var gridPath = "M " + Math.round(96 * scale) + " 0 L 0 0 0 " + Math.round(96 * scale) ;
        //p.setWidth( parentWidth);
        //p.setHeight(trueHeight);
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
                render: 'onRenderLayoutPanel' // get the child objects in here
            },
            items: [
                {

                    // todo - get image from server
                    //                     html: '<svg  width="' + parentWidth + '" height="' + trueHeight + '" xmlns="http://www.w3.org/2000/svg">                    <defs>                    <pattern id="smallGrid' + p.id + '" width="8" height="8" patternUnits="userSpaceOnUse">                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/> </pattern> <pattern id="grid' + p.id + '" width="80" height="80" patternUnits="userSpaceOnUse"> <rect width="80" height="80" fill="url(#smallGrid' + p.id + ')"/> <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/> </pattern> </defs> <rect width="100%" height="100%" fill="url(#grid' + p.id + ')" /> </svg>'
                    html: '<div class="f-debug-info" z-index="999">' + Math.round(scale) + ' Size ' + parentWidth + 'x' + trueHeight + '</div><svg opacity="0.25" width="' + parentWidth + '" height="' + trueHeight + '" xmlns="http://www.w3.org/2000/svg">                    <defs>                     <pattern id="grid' + p.id + '" width="' + Math.round(98 * scale) + '" height="' + Math.round(98 * scale) + '" patternUnits="userSpaceOnUse"> <rect width="' + Math.round(98 * scale) + '" height="' + Math.round(98 * scale) + '" fill="url(#smallGrid' + p.id + ')"/> <path d="' + gridPath + '" fill="none" stroke="gray" stroke-width="2"/> </pattern> </defs> <rect width="100%" height="100%" fill="url(#grid' + p.id + ')" /> </svg>'
                }


            ]
        });
        p.insert(inner);


    }
});