/**
 * Created by Lee on 5/5/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObjectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layoutobject',

    requires: [
        'Advertising.view.main.common.pages.layout.LayoutObjectEditWindow'
    ],

    id: 'vclayoutobject',

    listen: {
        controller: {
            '#vclayoutobjectedit': {
                deleteLayoutObject: 'onDeleteLayoutObject'
            },
            '#vclayoutgridwindow': {
                updateLayoutsFromGridEvent: 'onUpdateLayoutsFromGrid'
            }

        }
    },
    /**
     * Called when the view is created
     */
    init: function () {

    },
    onAfterLayout: function (lo) {
        console.log("onAfterlayout(%o) - Layout complete %o", lo, lo.up('layout'));
        var parent = lo.up('layout');
        if (lo.firstLayout == true) {
            console.log("Flagging clean");
            lo.flagClean();
            lo.firstLayout = false;

        }
    },
    colorMap: {},
    onDragEnd: function (a, b, c) {
        console.log("Drag end");
        var ghost = a.proxy;

        ghost.removeCls('f-panel-drag-start');
        var comp = a.comp;
        console.log("A", a);


        var parent = comp.up('layout');
        var gridView = parent.down('panel');
        var container = parent.up('pagelayouts');
        var layoutViewModel = a.comp.up('layout').getViewModel();
        var scale = layoutViewModel.get('scale');
        var zoom = Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('zoom');
        var gridSize = Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('gridSize');


        console.log("Offset %o Scale %f Grid %f Zoom %f", container.getPosition(), scale, gridSize, zoom);
        var oneInch = Math.round(((96 * scale ) * ( zoom / 100)));
        var oneInchGrid = Math.round(oneInch * gridSize);
        console.log("Grid lines every %d pixels", oneInchGrid);

        var dragX1 = a.proxy.pageX;
        var dragY1 = a.proxy.pageY;
        var dragX2 = dragX1 + comp.width;
        var dragY2 = dragY1 + comp.height;
        console.log("Getting closest grid intersection...%d %d", dragX1 - gridView.getX(), dragY1 - gridView.getY());
        var snapX = Math.round(((dragX1 - gridView.getX()) / oneInchGrid ));
        var snapY = Math.round(((dragY1 - gridView.getY()) / oneInchGrid ));

        console.log("Snap X %d", snapX);
        console.log("Snap Y %d", snapY);
        comp.setPosition(snapX * oneInchGrid , snapY * oneInchGrid, true);

        Ext.ComponentQuery.query('layoutobject', container).forEach(function (subp) {
            //console.log("Xtype %s", subp.xtype);
            //console.log("Item 1 %s Item 2 %s", comp.id, subp.id);
            if (subp.id != comp.id) {
                //console.log("Checking other panel %o", subp);
                // see if panels overlap
                var pos = subp.getPosition();
                var otherX1 = pos[0];
                var otherY1 = pos[1];
                var otherX2 = otherX1 + subp.width;
                var otherY2 = otherY1 + subp.height;
                //console.log("Test..", testX, testY, testX1, testY1);
                //console.log("Source..x1 %d y1 %d x2 %d y2 %d", dragX1, dragY1, dragX2, dragY2);
                //console.log("Other..x1 %d y1 %d x2 %d y2 %d", otherX1, otherY1, otherX2, otherY2);

                if (dragY1 <= otherY2 && dragY2 >= otherY1 && dragX2 >= otherX1 && dragX1 <= otherX2) {
                    if (dragY1 < otherY2 || dragX1 < otherX2) {
                        // move down or over depending on which is closer

                        comp.setY(otherY2 + 1);
                        subp.getEl().setStyle('border-color', 'blue');

                    }

                } else {
                    subp.getEl().setStyle('border-color', 'blue');

                }
            }

        });

    },
    onBlurSection: function (combo, blur, eOpts) {
        // see if this should be a new addition
        // lookup the selected store record
        if (combo.value) {
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
    updateLayoutObjectFromRecord: function (record) {
        // get the active page
        var layout = Ext.ComponentQuery.query('pagelayouts')[0].getActiveTab().down('panel');
        layout.items.each(function (lo) {
            if (lo.xtype == 'layoutobject' && lo.layoutObjectID == record.get('layoutObjectID')) {
                // todo - handle cleaner
                lo.setComponentValue('instructions', record.get('instructions'));
                lo.setComponentValue('theme', record.get('theme'));
                lo.setComponentValue('owners', record.get('owners'));
                lo.setComponentValue('section', record.get('section'));


            }
        });
    },
    onUpdateLayoutsFromGrid: function (records) {
        var me = this;
        console.log("Updating layout for record %o", records);
        Ext.toast("record " + records.data);

        records.each(function (rec) {
            if (rec.isDirty()) {
                console.log("**** Update required on %o *****", rec);
                me.updateLayoutObjectFromRecord(rec);
            }
        });
        // we return false so this event is only fired one - otherwise its
        // called once per record
        return false;
    },
    /**
     * When a section value changes then update the layout background color
     * These need to be saved against the layout
     * @param combo
     * @param record
     * @param eOpts
     */
    onSectionChange: function (combo, event, eOpts) {
        var me = this;
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));

        if (Ext.isNumber(combo.value)) {


            var panel = combo.up('panel');
            console.log("Layout object %o", panel);
            panel.removeCls('f-layout-object-clean');

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
        me.setRecordValue(combo);

    },
    getRecord: function (component) {
        var store = component.up('layout').getViewModel().getStore('layoutObjects');
        var layout = component.up('layoutobject');
        var rec = store.findRecord('layoutObjectID', layout.layoutObjectID);
        console.log("getRecord %o", rec);
        if (rec) {
            return rec;
        }
    },
    setRecordValue: function (component) {
        var store = component.up('layout').getViewModel().getStore('layoutObjects');
        var layoutobject = component.up('layoutobject');
        console.log("Layout Object %o", layoutobject);
        // set layout viewModel Value
        var model = layoutobject.getViewModel();
        model.set(component.name + "_val", component.value);
        console.log("Model data ", model);
        var rec = store.findRecord('layoutObjectID', layoutobject.layoutObjectID);
        console.log("Record %o", rec);
        if (rec) {
            console.log("Set record value also..");
            rec.set(component.name, component.value);
            layoutobject.flagDirty();
        }
    },
    onShowEdit: function (combo, event, eOpts) {
        var me = this, lo = combo.up('layoutobject');
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));
        var win = Ext.create('Advertising.view.main.common.pages.layout.LayoutObjectEditWindow',
            {
                animateTarget: combo.id,
                sourceObject: combo.up('layoutobject')
            }).show();
    },

    onPromoTypeChange: function (combo, event, eOpts) {
        var me = this, lo = combo.up('layoutobject');
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));
        var record = combo.findRecordByValue(combo.value);
        console.log("onPromoTypeChange ", record);

        // update the store
        me.setRecordValue(combo);
        var extVal = record.get('extendedVal').split(',');
        // change the theme code and ad position
        var themeCombo = lo.down('[name="theme"]');

        themeCombo.setValue(extVal[2]);
        lo.down('[name="adPosition"]').setValue(extVal[1]);

    },
    onThemeChange: function (combo, event, eOpts) {

        var me = this;
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));
        // update the store
        me.setRecordValue(combo);
    },
    onOwnerChange: function (combo, event, eOpts) {
        var me = this;
        console.log("Owner change value %s for object %o", combo.value, combo.up('layoutobject'));
        if (combo.value.length != 0) {
            console.log("Setting record value %o", combo.value);
            me.setRecordValue(combo);
        }
    },
    onInstructionChange: function (textarea, event, eOpts) {
        var me = this;
        me.setRecordValue(textarea);

    },
    onBeforeObjectMove: function (promo, xPos, yPos) {
        console.debug("Before move %o %d %d", promo, xPos, yPos);
    },
    onObjectMove: function (pageObj, xPos, yPos, a, b, c) {
        var me = this;
        console.debug("Layout object was moved %o %d x %d %o %o %o", pageObj, xPos, yPos);
        me.onAdjustObjectSizeOrLocation(pageObj);


    },
    onAdjustObjectSizeOrLocation: function (pageObj) {
        var layoutViewModel = pageObj.up('layout').getViewModel();
        var scale = layoutViewModel.get('scale');
        var position = pageObj.getPosition();
        var zoom = Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('zoom');
        var parentPosition = pageObj.up('panel').getPosition();
        var realX = position[0] - parentPosition[0];
        var realY = position[1] - parentPosition[1];
        pageObj.getViewModel().set("xPos", realX);
        pageObj.getViewModel().set("yPos", realY);
        pageObj.getViewModel().set("newXInchPos", (((realX / 96) * (100 / zoom)) / scale));
        pageObj.getViewModel().set("newYInchPos", (((realY / 96) * (100 / zoom)) / scale));
        pageObj.getViewModel().set("undoDisabled", false);
        pageObj.getViewModel().set("newWidth", pageObj.width * (100 / zoom));
        pageObj.getViewModel().set("newHeight", pageObj.height * (100 / zoom));
        pageObj.getViewModel().set("newInchWidth", (((pageObj.width / 96) * (100 / zoom)) / scale));
        pageObj.getViewModel().set("newInchHeight", (((pageObj.height / 96) * (100 / zoom)) / scale));
        pageObj.setDebugInfo();
        pageObj.flagDirty();
        console.log("Page object info %o", pageObj.getViewModel().data);

    },
    onZoomChange: function (pageObj) {
        var me = this;
        console.debug("Layout object was resized due to zoom change %o %d x %d", pageObj);
        me.onAdjustObjectSizeOrLocation(pageObj);

    },
    onObjectResize: function (pageObj, width, height) {
        var me = this;
        console.debug("Layout object was resized %o %d x %d", pageObj, width, height);
        me.onAdjustObjectSizeOrLocation(pageObj);

    },
    onFill: function (type, tool, event, panel) {
        var me = this;
        console.log("Clicked tool ", tool, panel);
        var lo = panel.up('layoutobject');
        var layout = lo.up('layout').down('panel');
        var curPos = lo.getPosition();
        var layoutPos = layout.getPosition();
        var curWidth = lo.width;
        var curHeight = lo.height;
        var loX2 = layoutPos[0] + lo.width;
        var loY2 = layoutPos[1] + lo.height;

        var myX1 = curPos[0];
        var myY1 = curPos[1];
        var myX2 = curPos[0] + lo.width;
        var myY2 = curPos[1] + lo.height;
        var scrollY = layout.getScrollY();
        var scrollX = layout.getScrollX();

        console.log("Layout bounds %d %d %d %d", layoutPos[0], layoutPos[1], layoutPos[0] + layout.width, layoutPos[1] + layout.height);
        var container = layout.up('pagelayouts');
        var maxLeft = layoutPos[0];
        Ext.ComponentQuery.query('layoutobject', container).forEach(function (subp) {
            console.log("Item 1 %s Item 2 %s", lo.id, subp.id);
            if (subp.id != lo.id) {
                console.log("Left %d", subp.x);
                var subX1 = subp.x, subX2 = subX1 + subp.width, subY1 = subp.y, subY2 = subY1 + subp.height;
                if (myY1 <= subY1 && myY1 >= subY1) {
                    console.log("This will hit!");
                    maxLeft = ( subX2 > maxLeft) ? subX2 : maxLeft;
                }
            }
        });

        if (type == 'left') {
            lo.setX(layoutPos[0]);
            var newWidth = ( myX2 - layoutPos[0] );
            lo.setWidth(newWidth);
        }
        if (type == 'right') {
            var newWidth = (  layoutPos[0] + layout.width - myX1 );
            lo.setWidth(newWidth);
        }
        if (type == 'top') {
            lo.setY(layoutPos[1] - scrollY);
            var newHeight = (  scrollY + myY2 - layoutPos[1] );
            lo.setHeight(newHeight);
        }
        if (type == 'bottom') {
            var newHeight = (  (layoutPos[1] + layout.height ) - myY1 );
            console.log("Fill to bottom %d %d [%d]", layout.height, myY1, newHeight);

            lo.setHeight(newHeight);
        }

        //    me.onAdjustObjectSizeOrLocation(lo);
    },
    onFillUp: function (tool, evnt, panel) {
        var me = this;
        me.onFill('top', tool, evnt, panel);
    },
    onFillDown: function (tool, evnt, panel) {
        var me = this;
        me.onFill('bottom', tool, evnt, panel);
    },
    onFillLeft: function (tool, evnt, panel) {
        var me = this;
        me.onFill('left', tool, evnt, panel);
    },
    onFillRight: function (tool, evnt, panel) {
        var me = this;
        me.onFill('right', tool, evnt, panel);
    },
    onRenderObject: function (lo, eOpts) {
        console.log("Layout object rendered");
        var debugInfo = lo.down('[name="debugInfo"]');
        console.log("Debug info %o", debugInfo);
        lo.getViewModel().set("origX", lo.x);
        lo.getViewModel().set("origY", lo.y);
        //lo.setZIndex(1);
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
    onDeleteLayoutObject: function (layoutObject) {
        alert("Object deleted");
    },
    onExpandLayoutObject: function (btn) {
        var layoutobject = btn.up('layoutobject');
        console.log("Expand layout %o", layoutobject);
        var myData = {};
        btn.up('layoutobject').items.each(function (f) {
            console.log("Item %o", f);
        });


        var win = Ext.create("Advertising.view.main.common.pages.layout.LayoutObjectEditWindow",
            {
                animateTarget: btn.id
            });
        win.show();
    },
    onObjectFocus: function (promo) {
        console.log("Focus!!");
    },
    getRandomColor: function () {
        var letters = 'BCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }
});