/**
 * Created by Lee on 5/1/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoproductwindow.PromoProductWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promoproductwindow',

    /**
     * Called when the view is created
     */
    init: function() {

    },
    onActivateWindow: function(win) {
        console.log("Showing new product info window...%o", win);
        var store = win.getViewModel().getStore('offerItemsWin');
        store.getProxy().setExtraParam('promoID', win.getViewModel().get('promo').promoID);

        win.getViewModel().getStore('offerItemsWin').load();
    },

    renderImageCol: function(val) {

            return '<img height="50" src="http://laheadvsb01.ngco.com:8080/smartmedia/servlet/smartmediaservlet?ref=' + val + '&type=Image&res=thumb"/>';

    }
});