/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layout',

    requires: [
        'Advertising.view.main.common.pages.layout.LayoutObject',
        'Ext.layout.container.Absolute',
        'Ext.panel.Panel'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },
    onRenderLayoutPanel: function (p) {
        var parentPanel = p.up('panel');
        console.log("parent %o", parentPanel);
        var scale = parentPanel.getViewModel().get("scale");
        if (parentPanel.layoutData.hasOwnProperty(('layoutObjectList'))) {
            var layoutObjects = parentPanel.layoutData.layoutObjectList;
            console.log("Items %o", layoutObjects);
            Ext.toast("Adding " + layoutObjects.length + " items to layout");
            layoutObjects.forEach(function(lo) {
               console.log("Adding item %o", lo);
                var panel = Ext.create('Advertising.view.main.common.pages.layout.LayoutObject',{
                    width: lo.width * 96 * scale,
                    height: lo.height * 96 * scale,
                    x: lo.xPos * 96 * scale,
                    y: lo.yPos * 96 * scale,
                    items: [
                        {
                            html: '<font size="5vw">' + lo.metastyle.name + "</font>"
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
        var scale = parentWidth / ((p.inchWidth * 96) + 20);
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
                },
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