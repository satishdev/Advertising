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
        editMode: true,
        showLayouts: true,
        showGrids: true,
        showTools: true,
        showOffers: true,
        snapToGrid: true,
        showPageTools: true,
        showToolSplash: true,
        showMetricsTools: false,
        zoom: 100,
        gridSize:1,
        mode: 'none',
        stacked: false,
        splash: '<b>The tools will magically appear depending on the selections made in the application.</b>'
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});