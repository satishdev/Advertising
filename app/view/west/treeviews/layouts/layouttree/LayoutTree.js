/**
 * Created by Lee on 4/5/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTree', {
    extend: 'Advertising.view.west.treeviews.AdvTree',

    requires: [
        'Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeModel',
		'Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeController'
    ],

    xtype: 'layouttree',


    viewModel: {
        type: 'layouttree'
    },
    bind: {
        store: '{layouts}'
    },
    controller: 'layouttree',
    listeners: {
        itemclick: 'onTreeNodeSelect'
    },

    items: [
        /* include child components here */
    ]
});