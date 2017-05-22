/**
 * Created by Lee on 5/18/2017.
 */
Ext.define('Advertising.view.main.common.pages.layoutgridwindow.LayoutGridWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layoutgridwindow',
    id: 'vclayoutgridwindow',

    /**
     * Called when the view is created
     */
    init: function() {

    },
    onDeleteItemsClick: function(btn) {
        Ext.toast("Delete selected items?");
    },
    onUpdateLayoutFromGrid: function(btn){
        var me = this;
        Ext.toast("Updating layout items...");
        var store = btn.up('window').down('grid').getStore();
        console.log("Grid store %o", store);
        me.fireEvent('updateLayoutsFromGridEvent', store);
        btn.up('window').close();

    }
});