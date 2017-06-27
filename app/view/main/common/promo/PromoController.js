/**
 * Created by Lee on 4/4/2017.
 */
Ext.define('Advertising.view.main.common.promo.PromoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promo',

    requires: [
        'Advertising.view.main.common.promo.promoeditwindow.PromoEditWindow',
        'Advertising.view.main.common.promo.promoproductwindow.PromoProductWindow'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },
    onBeforeObjectMove: function (promo, xPos, yPos) {
        console.debug("Before move %o %d %d", promo, xPos, yPos);
    },
    onDragStart: function( e, info, evt, eOpts) {
        console.log("Dragging..." , e, info, evt. eOpts);
    },
    onObjectFocus:function(promo) {
      console.log("Focus!!");
    },
    onObjectMove: function (promo, xPos, yPos, a, b, c) {
        console.debug("Object was moved %o %d x %d %o %o %o", promo, xPos, yPos);
        promo.setDebugInfo();
        promo.flagDirty();
        Ext.toast("Promo " + promo.id + " was moved");

        promo.getViewModel().set("undoDisabled", false);
    },
    onShowEdit: function(btn) {
        var promo = btn.up('promo');
        console.log("Promo %o", promo);
        var editWin = Ext.create("Advertising.view.main.common.promo.promoeditwindow.PromoEditWindow",{
            promo: promo
        });
        editWin.animateTarget = btn.id;
        editWin.show();
    },
    onToggleGrid: function(btn) {
        var me = this;
        var promo = btn.up('promo');
         ( btn.pressed) ? btn.setIconCls("fa fa-image") : btn.setIconCls("fa fa-info");
        if ( btn.pressed) {
            Ext.toast("Getting items for promo offer");
            me.populatePromoItems(promo);
        } else {
            Ext.toast("Getting images for promo offer");

        }
        console.log("Updating promo %o", promo);
        promo.getViewModel().set("showGrid", btn.pressed);
    },
    onExpandGrid: function(btn) {

        var promo = btn.up('promo');
        console.log("Source promo %o", promo);
        var win = Ext.create('Advertising.view.main.common.promo.promoproductwindow.PromoProductWindow',{
            promo: promo

        });
        win.animateTarget = btn.id;
        win.show()

    },
    onPromoCheckChange: function(checkfield) {
        var me = this;
        var promo = checkfield.up('promo');
        console.log("Selected promo %o", promo);
        if ( checkfield.checked ) {
            promo.addCls("f-promo-checked");
        } else {
            promo.removeCls("f-promo-checked");
        }
    },
    /**
     * Load promo items from server
     * @param promo
     */
    populatePromoItems: function(promo) {
        console.log("Getting items from promo %o", promo);
        var store = promo.down('grid').getStore();
        store.getProxy().setExtraParam('promoID', promo.getViewModel().get('promoID'));

        console.log("Loading promo grid store %o", store);
        store.load();
    },
    onUndoPromoMove: function (btn) {

        var promo = btn.up('promo');
        console.debug("Undoing promo move...%o %d X %d", promo, promo.getViewModel().getData().origX, promo.getViewModel().getData().origY);
        promo.setY(promo.getViewModel().getData().origY,  false);
        promo.setX(promo.getViewModel().getData().origX,  false);
        promo.getViewModel().set("undoDisabled", true);
        promo.getViewModel().set("origX", promo.x);
        promo.getViewModel().set("origY", promo.y);

    },
    onObjectMove: function (pageObj, xPos, yPos, a, b, c) {
        var me =this;
        console.debug("Layout object was moved %o %d x %d %o %o %o", pageObj, xPos, yPos);
        me.onAdjustObjectSizeOrLocation(pageObj);


    },
    onAdjustObjectSizeOrLocation: function(pageObj) {
        var layoutViewModel = pageObj.up('layout').getViewModel();
        var scale = layoutViewModel.get('scale');
        var position = pageObj.getPosition();
        var zoom =  Ext.ComponentQuery.query("pagetoolpanel")[0].getViewModel().get('zoom');
        var parentPosition = pageObj.up('panel').getPosition();
        var realX = position[0] - parentPosition[0];
        var realY = position[1] - parentPosition[1];
        pageObj.getViewModel().set("xPos", realX );
        pageObj.getViewModel().set("yPos", realY );
        pageObj.getViewModel().set("newXInchPos", (((realX / 96) * (100/zoom)) / scale) );
        pageObj.getViewModel().set("newYInchPos", (((realY / 96) * (100/zoom)) / scale) );
        pageObj.getViewModel().set("undoDisabled", false);
        pageObj.getViewModel().set("newWidth", pageObj.width * (100/zoom));
        pageObj.getViewModel().set("newHeight", pageObj.height * (100/zoom));
        pageObj.getViewModel().set("newInchWidth", (((pageObj.width / 96) * (100/zoom)) / scale));
        pageObj.getViewModel().set("newInchHeight", (((pageObj.height / 96) * (100/zoom)) / scale));
        pageObj.setDebugInfo();
        pageObj.flagDirty();
        console.log("Page object info %o", pageObj.getViewModel().data);

    },
    onZoomChange: function (pageObj) {
        var me=this;
        console.debug("Layout object was resized due to zoom change %o %d x %d", pageObj);
        me.onAdjustObjectSizeOrLocation(pageObj);

    },
    onObjectResize: function (pageObj, width, height) {
        var me=this;
        console.debug("Layout object was resized %o %d x %d", pageObj, width, height);
        me.onAdjustObjectSizeOrLocation(pageObj);

    },
    onRenderObject: function (promo, eOpts) {
        console.log("Object rendered");
        var debugInfo = promo.down('[name="debugInfo"]');
        console.log("Debug info %o", debugInfo);
        promo.getViewModel().set("origX", promo.x);
        promo.getViewModel().set("origY", promo.y);

        // set the Zindex
        promo.setZIndex(100 + promo.getViewModel().get("adzoneID"));



    }


});