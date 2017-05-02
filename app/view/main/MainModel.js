/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Advertising.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',
    //stores: {
    //    wsserver: {
    //        proxy: {
    //            type: 'websocket' ,
    //            storeId: 'myStore',
    //            url: 'ws://laheadvsb01.ngco.com:8881' ,
    //            reader: {
    //                type: 'json' ,
    //                root: 'user'
    //            }
    //        }
    //    }
        /*
         A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
         store configuration. For example:

         users: {
         model: 'CopyPanel',
         autoLoad: true
         }
         */
    //},
    data: {
        name: 'Advertising',
        username: 'not set',
        zoomValue: 100,
        showLayouts: true,
        layoutTip: 'View page layouts - block positioning templates',
        loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }

});
