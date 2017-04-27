/**
 * Created by Lee on 4/12/2017.
 *
 * Controller for pages and layouts
 */
Ext.define('Advertising.view.main.common.pages.pageview.PageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page',

    requires: [
        'Advertising.view.main.common.Promo',
        'Advertising.view.main.common.pages.layout.LayoutObject',
        'Ext.layout.container.Absolute',
        'Ext.panel.Panel'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },
    onPageResize: function (page) {
        Ext.toast("Page was resized");
    },
    onAddPagePanel: function (p) {

        console.log("Parent panel size: %o", p.up('panel').getSize());
        var parentWidth = p.up('panel').getSize().width;
        var parentHeight = p.up('panel').getSize().height;
        //  var scale = parentWidth / ((p.inchWidth * 96) + 20);
        var scale = parentHeight / ((p.inchHeight * 96) + 100);
        console.log("Scale %f", scale);
        var me = this;
        me.getViewModel().set("scale", scale);
        var trueWidth = Math.round(p.inchWidth * 96 * scale);
        var trueHeight = Math.round(p.inchHeight * 96 * scale);

        var inner = Ext.create('Ext.panel.Panel', {
            border: true,
            flex: 1,
            padding: 10,
            width: trueWidth,
            height: trueHeight,
            layout: 'absolute',

            zIndex: 98,
            listeners: {
                render: 'onRenderPagePanel'
            },
            items: [
                {

                    // todo - get image from server
                    html: '<svg  width="' + trueWidth + '" height="' + trueHeight + '" xmlns="http://www.w3.org/2000/svg">                    <defs>                    <pattern id="smallGrid' + p.id + '" width="8" height="8" patternUnits="userSpaceOnUse">                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/> </pattern> <pattern id="grid' + p.id + '" width="80" height="80" patternUnits="userSpaceOnUse"> <rect width="80" height="80" fill="url(#smallGrid' + p.id + ')"/> <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/> </pattern> </defs> <rect width="100%" height="100%" fill="url(#grid' + p.id + ')" /> </svg>'
                }
                //{
                //    xtype: 'draw',
                //    width: (p.inchWidth * 96 * scale),
                //    height: (p.inchHeight * 96 * scale),
                //    zIndex:99,
                //    plugins: ['spriteevents'],
                //
                //    sprites: [
                //        {
                //            type: 'circle',
                //            fillStyle: '#7BB20C',
                //            r: 75,
                //            x: 200,
                //            y: 200,
                //            fx: {
                //                duration: 300
                //            }
                //        },
                //
                //        {
                //            type: 'path',
                //            strokeStyle: 'rgb(222,127,209)',
                //            lineWidth: 12,
                //            lineCap: 'round',
                //            path: 'M 80 0 L 0 0 0 80',
                //            fx: {
                //                duration: 300
                //            }
                //        }
                //    ]
                //
                //listeners: {
                //    spriteclick: 'onSpriteClick'
                //}
                //}

            ]
        });
        p.insert(inner);
    },
    onRenderPagePanel: function (p) {
        var parentPanel = p.up('panel');
        console.log("parent %o", parentPanel);
        var scale = parentPanel.getViewModel().get("scale");
        // add placeholders
        if (parentPanel.objectData.hasOwnProperty(('placeholders'))) {
            var placeholders = parentPanel.objectData.placeholders;
            console.log("Adding placeholders..%o", placeholders);
            placeholders.forEach(function (ph) {
                console.log("Adding item %o", ph);
                var panel = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject', {
                    width: ph.width * 96 * scale,
                    height: ph.height * 96 * scale,
                    x: ph.xPos * 96 * scale,
                    y: ph.yPos * 96 * scale,
                    items: [
                        {
                            html: '<p size="4vw">' + ph.description + "</p>"
                        }
                    ]

                });
                console.log("New panel %o", panel);
                p.insert(panel);
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
                    x: po.xPos * 96 * scale,
                    y: po.yPos * 96 * scale,
                    items: [
                        {
                            html: '<p size="4vw">' + po.name + "</p>"
                        }
                    ]

                });
                console.log("New panel %o", panel);
                p.insert(panel);
            });
        } else {
            Ext.toast("No page object on page");
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
                    width: lo.width * 96 * scale,
                    height: lo.height * 96 * scale,
                    x: lo.xPos * 96 * scale,
                    y: lo.yPos * 96 * scale,
                    items: [
                        {
                            html: '<p size="4vw">' + lo.metastyle.name + "</p>"
                        }
                    ]

                });
                console.log("New panel %o", panel);
                p.insert(panel);
            });
        } else {
            Ext.toast("No layout object on page");
        }
    },
    onAddLayoutPanel: function (p) {

        console.log("Parent panel size: %o", p.up('panel').getSize());
        var parentWidth = p.up('panel').getSize().width;
        var parentHeight = p.up('panel').getSize().height;
        //  var scale = parentWidth / ((p.inchWidth * 96) + 20);
        var scale = parentHeight / ((p.inchHeight * 96) + 100);
        console.log("Scale %f", scale);
        var me = this;
        me.getViewModel().set("scale", scale);
        var trueWidth = Math.round(p.inchWidth * 96 * scale);
        var trueHeight = Math.round(p.inchHeight * 96 * scale);

        var inner = Ext.create('Ext.panel.Panel', {
            border: true,
            flex: 1,
            padding: 10,
            width: trueWidth,
            height: trueHeight,
            layout: 'absolute',

            zIndex: 98,
            listeners: {
                render: 'onRenderLayoutPanel'
            },
            items: [
                {

                    // todo - get image from server
                    html: '<svg  width="' + trueWidth + '" height="' + trueHeight + '" xmlns="http://www.w3.org/2000/svg">                    <defs>                    <pattern id="smallGrid' + p.id + '" width="8" height="8" patternUnits="userSpaceOnUse">                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/> </pattern> <pattern id="grid' + p.id + '" width="80" height="80" patternUnits="userSpaceOnUse"> <rect width="80" height="80" fill="url(#smallGrid' + p.id + ')"/> <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/> </pattern> </defs> <rect width="100%" height="100%" fill="url(#grid' + p.id + ')" /> </svg>'
                }
                //{
                //    xtype: 'draw',
                //    width: (p.inchWidth * 96 * scale),
                //    height: (p.inchHeight * 96 * scale),
                //    zIndex:99,
                //    plugins: ['spriteevents'],
                //
                //    sprites: [
                //        {
                //            type: 'circle',
                //            fillStyle: '#7BB20C',
                //            r: 75,
                //            x: 200,
                //            y: 200,
                //            fx: {
                //                duration: 300
                //            }
                //        },
                //
                //        {
                //            type: 'path',
                //            strokeStyle: 'rgb(222,127,209)',
                //            lineWidth: 12,
                //            lineCap: 'round',
                //            path: 'M 80 0 L 0 0 0 80',
                //            fx: {
                //                duration: 300
                //            }
                //        }
                //    ]
                //
                //listeners: {
                //    spriteclick: 'onSpriteClick'
                //}
                //}

            ]
        });
        p.insert(inner);
    }
});