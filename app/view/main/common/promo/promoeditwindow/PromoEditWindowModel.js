/**
 * Created by Lee on 4/7/2017.
 */
Ext.define('Advertising.view.main.common.promo.promoeditwindow.PromoEditWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promoeditwindow',

    stores: {
        storeGroups: {
            data: [
                {
                    sg: 'Store Group 1',
                    group: 1
                },
                {
                    sg: 'Store Group 2',
                    group: 1
                },
                {
                    sg: 'Store Group 3',
                    group: 1
                },
                {
                    sg: 'Store Group 4',
                    group: 1
                },

                {
                    sg: 'Store Group 5',
                    group: 1
                },
                {
                    sg: 'Store Group 6',
                    group: 1
                },
                {
                    sg: 'Store Group 7',
                    group: 1
                }
            ]
        },
        sizes: {
            data: [
                {
                    msID: '1',
                    msName: '1 x 1'
                },
                {
                    msID: '2',
                    msName: '1 x 2'

                }
                , {
                    msID: '3',
                    msName: '2 x 1'
                }
                    ,{
                    msID: '4',
                    msName: '2 x 2'

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