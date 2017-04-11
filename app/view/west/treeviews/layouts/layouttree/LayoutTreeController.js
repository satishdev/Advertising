/**
 * Created by Lee on 4/5/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layouttree',
    id: 'vclayouttreecontroller',

    /**
     * Called when the view is created
     */
    init: function() {

    },
    onTreeNodeSelect: function(tree,record,ndx,opts) {
        // see if this is a layout or just a folder
        if ( record.data.hasOwnProperty('nodetype') &&  record.get('nodetype') == 'LAYOUT') {
            this.fireEvent('layoutTreeSelection', record);
        }
    }
});