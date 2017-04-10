/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventtree',
    id: 'vceventtreecontroller',
    /**
     * Called when the view is created
     */
    init: function() {

    },
    onTreeNodeSelect: function(tree,record,ndx,opts) {
        Ext.toast("Node clicked " + record.data);
        this.fireEvent('eventTreeSelection', record);
    }
});