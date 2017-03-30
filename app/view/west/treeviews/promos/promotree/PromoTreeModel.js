/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promotree.PromoTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.promotree',

    requires: [
        'Ext.data.TreeStore'
    ],

    stores: {
        promos: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: "JDA Ad #1",
                    children: [

                            {
                                text: "Promo 1",
                                leaf: true
                            },
                            {
                                text: "Promo 2",
                                leaf: true
                            },
                            {
                                text: "Promo 3",
                                leaf: true
                            }, {
                                text: "Promo 4",
                                leaf: true
                            },
                            {
                                text: "Promo 5",
                                leaf: true
                            }

                        ]

                }]
            }
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});