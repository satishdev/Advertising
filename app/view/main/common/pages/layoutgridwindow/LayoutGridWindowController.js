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
    onSelectedRowChange: function(checkbox, rowIndex, checked){
        console.log("Checkbox change %o", checked);
        var store = checkbox.up('window').down('grid').getStore();

        if ( checked) {
            store.getAt(rowIndex).set('excluded', true);
        } else {
            store.getAt(rowIndex).set('excluded', false);
        }
    },
    onRemoveClick: function(btn, rowIndex) {
        // look for items selected
        alert("Really delete " + rowIndex);
        var selectedCount = 0;



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