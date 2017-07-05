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
    onLayoutObjectResize: function (pageObj, width, height) {
        var me=this;
        console.debug("Layout object was resized %o %d x %d", pageObj, width, height);
        me.onAdjustObjectSizeOrLocation(pageObj);
     //   me.performSnap(pageObj,pageObj.pageX, pageObj.pageY );

    },
    performSnap:function(comp,x,y) {
        var parent = comp.up('layout'), model = comp.getViewModel();
        var gridView = parent.down('panel');
        var container = parent.up('pagelayouts');
        var layoutViewModel = comp.up('layout').getViewModel();
        var scale = layoutViewModel.get('scale');
        var zoom = Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('zoom');
        var gridSize = Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('gridSize');
        var snapToGrid = Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('snapToGrid');

        // snap items to the grid
        if (snapToGrid) {
            comp.getViewModel().set('autoMove',true);

            console.log("Offset %o Scale %f Grid %f Zoom %f", container.getPosition(), scale, gridSize, zoom);
            var oneInch = Math.round(((96 * scale ) * ( zoom / 100)));
            var oneInchGrid = Math.round(oneInch * gridSize);
            console.log("Grid lines every %d pixels", oneInchGrid);

            var dragX1 = x;
            var dragY1 = y;
            var dragX2 = dragX1 + comp.width;
            var dragY2 = dragY1 + comp.height;
            console.log("Getting closest grid intersection...%d %d", dragX1 - gridView.getX(), dragY1 - gridView.getY());
            var compCols = Math.round(  comp.width / oneInchGrid );
            var compRows = Math.round(  comp.height /oneInchGrid  ) ;
            console.log("Comp rows %d", compRows);
            console.log("Comp cols %d", compCols);
            var snapX = Math.round(((dragX1 - gridView.getX()) / oneInchGrid ));
            var snapY = Math.round(((dragY1 - gridView.getY()) / oneInchGrid ));

            console.log("Snap X %d", snapX);
            console.log("Snap Y %d", snapY);
            var snapX2 = Math.round(((dragX2 - gridView.getX()) / oneInchGrid ));
            var snapY2 = Math.round(((dragY2 - gridView.getY()) / oneInchGrid ));
            var rows = Math.round(gridView.height / oneInchGrid);
            var columns = Math.round(gridView.width / oneInchGrid);
            var maxCols = ( columns - snapX);
            var maxRows = ( rows - snapY);
            console.log("Rows %d Columns %d - max rows %d max cols %d", rows, columns, maxRows, maxCols);
            snapX2 = ( snapX2 > maxCols) ? maxCols : snapX2;
            snapY2 = ( snapY2 > maxRows) ? maxRows : snapY2;

            console.log("Snap X2 %d", snapX2);
            console.log("Snap Y2 %d", snapY2);
            // see if component is too large for panel

            comp.setSize(  compCols * oneInchGrid, compRows * oneInchGrid).setPosition(snapX * oneInchGrid, snapY * oneInchGrid, {
                easing: 'linear',
                duration: 300
            });
            model.set('inchWidth', compRows * gridSize);
            model.set('inchHeight',compCols * gridSize);
            comp.getViewModel().set('autoMove',false);


        }
    },
    onAfterLayout: function (lo) {
        console.log("onAfterRender(%o) - Layout complete %o %s", lo, lo.up('layout'), lo.getViewModel().get('firstLayout') );
        var parent = lo.up('layout');
        if (lo.getViewModel().get('firstLayout') === true) {
            console.log("First Layout %s Flagging clean", lo.id);
            lo.flagClean();
            lo.getViewModel().set('firstLayout',false);

        }
    },
    colorMap: {},
    onDragEnd: function (a, b, c) {
        console.log("Drag end");
        var ghost = a.proxy, me=this;

        ghost.removeCls('f-panel-drag-start');
        var comp = a.comp;
        console.log("A", a);

        me.performSnap(comp,a.proxy.pageX, a.proxy.pageY );
        comp.getViewModel().set('origX', a.proxy.pageX);
        comp.getViewModel().set('origY', a.proxy.pageY);





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
            lo.flagClean();

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
        // store value in model
        var rec = combo.store.findRecord('name',combo.value);
        if ( rec ) {
            console.log("Rec %o", rec);
            combo.up('layoutobject').getViewModel().set('sectionSelection', rec.data.name);
        }
        if (Ext.isString(combo.value)) {


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
        model.set(component.name , component.value);
        console.log("Model data ", model);
        var rec = store.findRecord('layoutObjectID', layoutobject.layoutObjectID);
        console.log("Record %o", rec);
        if (rec) {
            console.log("Set record value also %o", component.value);
            if ( component.value ) {
                rec.set(component.name, component.value);
                layoutobject.flagDirty();
            }
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
        if ( record.get('extendedVal')) {
            var extVal = record.get('extendedVal').split(',');
            //   change the theme code and ad position
            var themeCombo = lo.down('[name="theme"]');
            if (extVal && extVal.length > 1) {
                themeCombo.setValue(extVal[2]);
                lo.down('[name="adposition"]').setValue(extVal[1]);
            }
        }
    },
    onThemeChange: function (combo, event, eOpts) {

        var me = this;
        console.log("Combo value %s for object %o", combo.value, combo.up('layoutobject'));
        // update the store
        me.setRecordValue(combo);
    },
    onOwnerChange: function (combo, event, eOpts) {
        var me = this, lo = combo.up('layoutobject');
        console.log("Owner change value %s for object %o", combo.value, combo.up('layoutobject'));
        if (combo.value.length != 0) {
            console.log("Setting record value %o", combo.value);
            me.setRecordValue(combo);
            var stringVal = '';
            for ( var x= 0 ; x < combo.value.length; x++ ) {
                stringVal += combo.value[x] + " / ";
            }
            lo.getViewModel().set('ownerList',combo.value);

        } else {
            lo.getViewModel().set('ownerList','No Owners');
        }
    }
    ,
    onInstructionChange: function (textarea, event, eOpts) {
        var me = this;
        me.setRecordValue(textarea);

    },
    onBeforeObjectMove: function (promo, xPos, yPos) {
        //   console.debug("Before move %o %d %d", promo, xPos, yPos);
    },
    onObjectMove: function (pageObj, xPos, yPos, a, b, c) {
       // if ( pageObj.getViewModel().get('autoMove')) {
            var me = this;
      //      console.debug("Layout object was moved %o %d x %d", pageObj, xPos, yPos);
            me.onAdjustObjectSizeOrLocation(pageObj);
      //  }

    },
    onAdjustObjectSizeOrLocation: function (pageObj) {
        var me=this, layoutViewModel = pageObj.up('layout').getViewModel();
        var scale = layoutViewModel.get('scale');
        var position = pageObj.getPosition();
        var zoom = Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('zoom');
        var parentPosition = pageObj.up('panel').getPosition();
        var realX = position[0] - parentPosition[0];
        var realY = position[1] - parentPosition[1];
        //pageObj.getViewModel().set("xPos", realX);
        //pageObj.getViewModel().set("yPos", realY);
        pageObj.getViewModel().set("newXInchPos", (((realX / 96) * (100 / zoom)) / scale));
        pageObj.getViewModel().set("newYInchPos", (((realY / 96) * (100 / zoom)) / scale));
        pageObj.getViewModel().set("undoDisabled", false);
        pageObj.getViewModel().set("newWidth", pageObj.width * (100 / zoom));
        pageObj.getViewModel().set("newHeight", pageObj.height * (100 / zoom));
        pageObj.getViewModel().set("newInchWidth", (((pageObj.width / 96) * (100 / zoom)) / scale));
        pageObj.getViewModel().set("newInchHeight", (((pageObj.height / 96) * (100 / zoom)) / scale));
        pageObj.setDebugInfo();
        pageObj.flagDirty();

      //  console.log("Page object info %o", pageObj.getViewModel().data);

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
    onDuplicateLayoutObject: function(tool, evnt, panel) {
        var me = this;
        var lo = panel.up('layoutobject');
        console.log("Duplicating element %o", lo);
        this.fireEvent('duplicatePageObject', lo.getViewModel().getData());

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