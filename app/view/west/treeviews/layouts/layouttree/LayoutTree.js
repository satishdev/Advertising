/**
 * Created by Lee on 4/5/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTree', {
    extend: 'Advertising.view.west.treeviews.AdvTree',

    requires: [
        'Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeController',
        'Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeModel',
        'Ext.grid.plugin.DragDrop'
    ],

    xtype: 'layouttree',
    rootVisible: false,
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag layouts to pages'
        }
    },
    viewModel: {
        type: 'layouttree'
    },
    bind: {
        store: '{layouts}'
    },
    controller: 'layouttree',
    listeners: {
        itemclick: 'onTreeNodeSelect',
        itemcontextmenu: 'onShowLayoutTreeMenu',
        drop: 'onNodeTreeDrop'
    },

    items: [
        {

        }
    ]
});