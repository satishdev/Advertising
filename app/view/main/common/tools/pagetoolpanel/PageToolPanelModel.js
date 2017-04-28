/**
 * Created by Lee on 4/20/2017.
 */
Ext.define('Advertising.view.main.common.tools.pagetoolpanel.PageToolPanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pagetoolpanel',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'PageToolPanel',
            autoLoad: true
        }
        */
    },

    data: {
        showLayouts: true,
        showGrids: true
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});