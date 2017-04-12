/**
 * Created by Lee on 4/12/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layout',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Layout',
            autoLoad: true
        }
        */
    },

    data: {
        scale: 1
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});