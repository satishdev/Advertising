/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTree', {
    extend: 'Advertising.view.west.treeviews.AdvTree',

    xtype: 'eventtree',

    requires: [
        'Advertising.view.west.treeviews.events.eventtree.EventTreeController',
        'Advertising.view.west.treeviews.events.eventtree.EventTreeModel'
    ],

    bind: {
        store: '{events}'
    },
    viewModel: {
        type: 'eventtree'
    },
    listeners: {
        itemclick: 'onTreeNodeSelect'
    },
    rootVisible: false,
    controller: 'eventtree'
});