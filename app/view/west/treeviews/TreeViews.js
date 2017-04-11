/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.west.treeviews.TreeViews', {
    extend: 'Ext.Container',




    xtype: 'treeviews',

    requires: [
        'Advertising.view.west.treeviews.TreeViewsController',
        'Advertising.view.west.treeviews.TreeViewsModel',
        'Advertising.view.west.treeviews.events.eventtree.EventTree',
        'Advertising.view.west.treeviews.promos.promogrid.Promogrid',
        'Ext.layout.container.Accordion'
    ],

    layout: 'accordion',
    viewModel: {
        type: 'treeviews'
    },

    controller: 'treeviews',

    items: [
        /* include child components here */
        {
            title: 'Events',
            xtype: 'eventtree'
        },
        {
            title: 'Promos',
            xtype: 'promogrid'

        },
        {
            title: 'Products'
        },
        {
            title: 'Layouts'
        }
    ]
});