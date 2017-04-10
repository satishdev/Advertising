/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.main.layouts.pagelayouts.PageLayoutsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pagelayouts',
    id: 'vcpagelayoutscontroller',

    listen: {
        controller: {
            '#vceventtreecontroller': {
                eventTreeSelection: 'onPageChange'
            }
        }
    },
    /**
     * Called when the view is created
     */
    init: function () {

    },
    onSaveChanges: function (btn) {
        Ext.toast("Saving changes...");

    },
    /* Turn on/off layouts for page view */
    onToggleLayouts: function (btn) {
        var pageView = btn.up('pagelayouts');
        console.log("Layouts %o %s", pageView, btn.pressed);
        Ext.toast("Turn layouts " + (( btn.pressed) ? "on" : "off"));
    },
    /* Turn on/off themes for page view */
    onToggleThemes: function (btn) {
        var pageView = btn.up('pagelayouts');
        console.log("Themes %o %s", pageView, btn.pressed);
        Ext.toast("Turn themes " + (( btn.pressed) ? "on" : "off"));
    },
    /* Turn on/off grid for page view */
    onToggleGrid: function (btn) {
        var pageView = btn.up('pagelayouts');
        console.log("Grid %o %s", pageView, btn.pressed);
        Ext.toast("Turn grid " + (( btn.pressed) ? "on" : "off"));
    },
    /*
        page change requested
     */
    onPageChange: function (record) {
        var me = this;
        var nodetype = record.data.nodetype;
        if ( nodetype == 'PAGE') {
            me.getViewModel().set("pagename", record.data.text);
        }
        console.log("Page view change request");
        Ext.toast("Page change requested " + record.data.nodetype + ":" + record.data.text);

    },
    onPageResize: function (pageview, width, height, origWidth, origHeight) {
        var me = this;
        if (isNaN(origWidth)) {
            return;
        }
        console.log("Page %o resized %dX%d...moving promos %d-%d", pageview, width, height, origWidth, origHeight);
        var widthScale = width / origWidth;
        var heightScale = height / origHeight;
        console.log("New scale %f x %f", widthScale, heightScale);
        Ext.ComponentQuery.query('promo').forEach(function (promo) {
            console.log("Resize promo %o", promo);
            promo.setWidth(promo.width * widthScale);
            promo.setHeight(promo.height * heightScale);
        });
    }
});