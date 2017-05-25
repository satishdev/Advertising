/**
 * Created by Lee on 5/24/2017.
 */
Ext.define('Advertising.view.main.changecontrol.ChangeControlModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.changecontrol',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'ChangeControl',
            autoLoad: true
        }
        */
        dummyData: {
            data: [
                {vehicle:'Some vehicle',page: 'Page 1',promo:'test promo',type: 'price', oldValue: 8.99, newValue: 10.99},
                {vehicle:'Some vehicle',page: 'Page 1',promo:'test promo2',type: 'price', oldValue: 6.99, newValue: 4.99},
                {vehicle:'Some vehicle',page: 'Page 1',promo:'test promo3',type: 'price', oldValue: 2.99, newValue: .99},
                {vehicle:'Some vehicle',page: 'Page 1',promo:'test promo4',type: 'product', oldValue: 'product A', newValue: 'product B'},
                {vehicle:'Some vehicle',page: 'Page 1',promo:'test promo5',type: 'price', oldValue: 1.99, newValue: 2.99}
            ]

        }

    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});