/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Advertising.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Advertising',
        username: 'not set',
        zoomValue: 100,
        showTools: false,
        showLayouts: true,
        showGrids: true,
        layoutTip: 'View page layouts - block positioning templates'
    }

});
