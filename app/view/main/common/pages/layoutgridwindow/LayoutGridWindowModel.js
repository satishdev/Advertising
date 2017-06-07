/**
 * Created by Lee on 5/18/2017.
 */
Ext.define('Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layoutgridwindow',

    requires: [
        'Ext.data.reader.Json'
    ],

    stores: {
        owners: {
            proxy: {
                type : 'ajax',
                autoLoad: true,
                useDefaultXhrHeader: false,
                url:  Advertising.util.GlobalValues.serviceURL + '/attributes/getAllOwners',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    data: {
        windowTitle: 'Layout grid view'
    }
});