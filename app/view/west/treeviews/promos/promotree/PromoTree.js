/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promotree.PromoTree', {
    extend: 'Advertising.view.west.treeviews.AdvTree',

    requires: [
        'Advertising.view.west.treeviews.promos.promotree.PromoTreeModel',
		'Advertising.view.west.treeviews.promos.promotree.PromoTreeController'
    ],

    xtype: 'promotree',

    rootVisible: false,

    viewModel: {
        type: 'promotree'
    },
    bind: {
        store: '{promos}'
    },
    controller: 'promotree'
});