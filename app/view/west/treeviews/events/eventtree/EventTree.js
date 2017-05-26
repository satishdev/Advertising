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
    // todo add ability to search and expand tree
    //tools: [
    //    {
    //        type: 'search',
    //        callback: function (panel) {
    //            // do search
    //
    //        }
    //    }
    //],

    listeners: {
        itemclick: 'onTreeNodeSelect',
        itemcontextmenu: 'onShowEventTreeMenu'
    },
    rootVisible: false,
    controller: 'eventtree'
});