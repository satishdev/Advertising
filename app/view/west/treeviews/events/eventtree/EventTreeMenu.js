/**
 * Created by Lee on 4/25/2017.
 */
Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTreeMenu', {
    extend: 'Ext.menu.Menu',

    xtype: 'eventtreemenu',


    requires: [
        'Advertising.view.west.treeviews.events.eventtree.EventTreeModel'
    ],


    items: [{
        text: 'item 1'
    }
        /* include child components here */
    ]
});