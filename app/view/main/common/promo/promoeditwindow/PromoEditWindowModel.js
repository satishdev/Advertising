/**
 * Created by Lee on 4/7/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoeditwindow.PromoEditWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promoeditwindow',

    stores: {
        metastyles: {
            data: [
                {
                    msID: '1',
                    msName: 'Sample 1'
                },
                {
                    msID: '2',
                    msName: 'Sample 2'

                }
                ,{
                    msID: '3',
                    msName: 'Sample 3'

                }
            ]
        }
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'PromoEditWindow',
            autoLoad: true
        }
        */
    },

    data: {
        name: 'test'
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});