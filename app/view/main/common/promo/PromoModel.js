/**
 * Created by Lee on 4/4/2017.
 */
Ext.define('Advertising.view.main.common.promo.PromoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promo',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Promo',
            autoLoad: true
        }
        */
    },

    data: {
        debug: true,
        debugInfo: 'debug info',
        undoDisabled: true,
        showGrid: false,
        width: 350,
        height: 220,
        origX: 0,
        origY: 0
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});