/**
 * Created by Lee on 4/7/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoeditwindow.PromoEditWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promoeditwindow',

    requires: [
        'Ext.data.Store'
    ],

    /**
     * Called when the view is created
     */
    init: function() {

    },
    onRenderPromoEditWindow: function(win) {
        var store = new Ext.data.Store({

            sortOnLoad: true,
            data: [
                {
                    sg: 'sg1',
                    group: 1
                }
            ],
            autoLoad: false


        });
        win.down('grid').store = store;
    },
    onStoreGroupClick: function(btn) {
        btn.setStyle('background-color: red');
    }
});