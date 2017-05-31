/**
 * Created by Lee on 5/16/2017.
 */
Ext.define('Advertising.view.main.layouts.layoutcreator.LayoutCreatorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layoutcreator',

    stores: {
        promotypes: {
            data: [
                {
                    name: 'F-Bakery Namos'
                },
                {
                    name: 'F-Bakery'
                }
            ]
        }
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'LayoutCreator',
            autoLoad: true
        }
        */
    },

    data: {
        width: 10,
        height: 10,
        name: '',
        description: 'Ideally we would let the user pick from a set of templates..e,g [2,3,2],[4,4,4,4]'
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});