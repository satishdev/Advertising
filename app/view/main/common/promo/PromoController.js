/**
 * Created by Lee on 4/4/2017.
 */
Ext.define('Advertising.view.main.common.promo.PromoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promo',

    requires: [
        'Advertising.view.main.common.promo.promoeditwindow.PromoEditWindow'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },
    onBeforePromoMove: function (promo, xPos, yPos) {
        console.debug("Before move %o %d %d", promo, xPos, yPos);
    },
    onPromoMove: function (promo, xPos, yPos, a, b, c) {
        console.debug("Promo was moved %o %d x %d %o %o %o", promo, xPos, yPos);
        promo.setDebugInfo(xPos + ":" + yPos);
        promo.flagMoved();
        Ext.toast("Promo " + promo.id + " was moved");

        promo.getViewModel().set("undoDisabled", false);
    },
    onShowEdit: function(btn) {
        var promo = btn.up('promo');
        console.log("Promo %o", promo);
        var editWin = Ext.create("Advertising.view.main.common.promo.promoeditwindow.PromoEditWindow",{
            promo: promo
        }).show();
    },
    onToggleGrid: function(btn) {
        var promo = btn.up('promo');
         ( btn.pressed) ? btn.setIconCls("fa fa-image") : btn.setIconCls("fa fa-info");
        promo.getViewModel().set("showGrid", btn.pressed);
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
    onUndoPromoMove: function (btn) {

        var promo = btn.up('promo');
        console.debug("Undoing promo move...%o %d X %d", promo, promo.getViewModel().getData().origX, promo.getViewModel().getData().origY);
        promo.setY(promo.getViewModel().getData().origY,  false);
        promo.setX(promo.getViewModel().getData().origX,  false);
        promo.getViewModel().set("undoDisabled", true);
        promo.getViewModel().set("origX", promo.x);
        promo.getViewModel().set("origY", promo.y);

    },
    onPromoResize: function (promo, width, height) {
        console.debug("Promo was resized %o %d x %d", promo, width, height);
        promo.setDebugInfo(width + ":" + height);
    },
    onRenderPromo: function (promo, eOpts) {
        console.log("Promo rendered");
        var debugInfo = promo.down('[name="debugInfo"]');
        console.log("Debug info %o", debugInfo);
        promo.getViewModel().set("origX", promo.x);
        promo.getViewModel().set("origY", promo.y);
    }


});