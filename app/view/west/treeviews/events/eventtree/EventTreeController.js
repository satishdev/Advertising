/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventtree',

    requires: [
        'Ext.window.Toast'
    ],

    /**
     * Called when the view is created
     */
    init: function() {

    },
    onTreeNodeSelect: function(tree,record,ndx,opts) {
        console.log("Clicked!");
        Ext.window.Toast('test');
    }
});