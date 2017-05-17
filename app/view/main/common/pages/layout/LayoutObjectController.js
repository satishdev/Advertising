/**
 * Created by Lee on 5/5/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObjectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layoutobject',

    requires: [
        'Advertising.view.main.common.pages.layout.LayoutObjectEditWindow',
        'Ext.dd.DragZone'
    ],

    /**
     * Called when the view is created
     */
    init: function() {

    },
    colorMap: {},
    onBlurSection: function(combo, blur,eOpts) {
        // see if this should be a new addition
        // lookup the selected store record
        if ( combo.value ) {
            var value = combo.value;
            var record = combo.store.getById(combo.value);
            if (record == null) {
               console.log("Add new entry %s", value);
                combo.store.add({
                   name: value
                });
            }
        }
    },
    /**
     * When a section value changes then update the layout background color
     * These need to be saved against the layout
     * @param combo
     * @param record
     * @param eOpts
     */
    onSectionChange: function(combo , event , eOpts) {
        var me = this;
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));
        if ( Ext.isNumber(combo.value)) {

            var panel = combo.up('panel');
            console.log("Layout object %o", panel);
            panel.removeCls('.f-layout-object-clean');

            var comboSection = combo.value;
            console.log("Colour map %o", me.colorMap);
            if (!me.colorMap.hasOwnProperty(comboSection)) {
                me.colorMap[comboSection] = me.getRandomColor();
                // make sure all other layouts have this record

                //combo.store.add({
                //    name: comboSection
                //});
                //combo.store.sync();
                console.log("Combo store updated %o", combo.store);
            }
            panel.setBodyStyle('background-color', me.colorMap[comboSection]);



        }
        combo.up('layoutobject').flagDirty();

    },
    onThemeChange: function(combo , event , eOpts) {
        var me = this;
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));
       // combo.up('layoutobject').flagDirty();
    },
    onOwnerChange: function(combo , event , eOpts) {
        var me = this;
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));
        //combo.up('layoutobject').flagDirty();
    },
    onInstructionChange: function(combo , event , eOpts) {
        var me = this;
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));
        combo.up('layoutobject').flagDirty();
    },
    onBeforeObjectMove: function (promo, xPos, yPos) {
        console.debug("Before move %o %d %d", promo, xPos, yPos);
    },
    onObjectMove: function (pageObj, xPos, yPos, a, b, c) {
        console.debug("Promo was moved %o %d x %d %o %o %o", pageObj, xPos, yPos);

        pageObj.setDebugInfo();
        pageObj.flagDirty();
        Ext.toast("Object " + pageObj.id + " was moved");

        pageObj.getViewModel().set("undoDisabled", false);
    },
    onObjectResize: function (pageObj, width, height) {
        console.debug("Promo was resized %o %d x %d", pageObj, width, height);
        pageObj.setDebugInfo();

    },
    onRenderObject: function (lo, eOpts) {
        console.log("Layout object rendered");
        var debugInfo = lo.down('[name="debugInfo"]');
        console.log("Debug info %o", debugInfo);
        lo.getViewModel().set("origX", lo.x);
        lo.getViewModel().set("origY", lo.y);
        lo.setZIndex(1);
        //lo.toFront();
        // set the Zindex
        //promo.setZIndex(100 + promo.getViewModel().get("adzoneID"));
//
//        lo.dragZone = Ext.create('Ext.dd.DragZone', lo.getEl(), {
//
////      On receipt of a mousedown event, see if it is within a draggable element.
////      Return a drag data object if so. The data object can contain arbitrary application
////      data, but it should also contain a DOM element in the ddel property to provide
////      a proxy to drag.
//            getDragData: function(e) {
//                console.log("Draggin!!");
//                var sourceEl = e.getTarget(lo.itemSelector, 10), d;
//                if (sourceEl) {
//                    d = sourceEl.cloneNode(true);
//                    d.id = Ext.id();
//                    return (lo.dragData = {
//                        sourceEl: sourceEl,
//                        repairXY: Ext.fly(sourceEl).getXY(),
//                        ddel: d,
//                        layoutData:lo.getViewModel().data
//                    });
//                }
//            },
//
////      Provide coordinates for the proxy to slide back to on failed drag.
////      This is the original XY coordinates of the draggable element.
//            getRepairXY: function() {
//                return this.dragData.repairXY;
//            }
//        });
    },
    onExpandLayoutObject: function(btn) {
        var layoutobject = btn.up('layoutobject');
        console.log("Expand layout %o", layoutobject);
        var myData = {};
        btn.up('layoutobject').items.each(function(f) {
            console.log("Item %o", f);
        });


        var win = Ext.create("Advertising.view.main.common.pages.layout.LayoutObjectEditWindow",
            {
                animateTarget: btn.id
            });
        win.show();
    },
    onObjectFocus:function(promo) {
        console.log("Focus!!");
    },
    getRandomColor: function() {
        var letters = 'BCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color ;
    }
});