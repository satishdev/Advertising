/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.main.layouts.pagelayouts.PageLayoutsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pagelayouts',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'PageLayouts',
            autoLoad: true
        }
        */
    },

    data: {
        pagename: 'Page X',
        layouts: []
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});