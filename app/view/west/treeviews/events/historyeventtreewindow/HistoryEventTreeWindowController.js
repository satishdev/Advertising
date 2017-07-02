/**
 * Created by leejw_000 on 2017-06-30.
 */
Ext.define('Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.historyeventtreewindow',
    id: 'vchistoryeventscontroller',
    /**
     * Called when the view is created
     */
    init: function () {

    },

    onRenderWindow: function (win) {
        var me = this;
        console.log("History win %o", win);
        console.log("Loading history store...");
        me.getViewModel().getStore('historyEvents').getProxy().extraParams = {
            fromDate: win.fromDate.toJSON(),
            toDate: win.toDate.toJSON()
        };
        me.getViewModel().getStore('historyEvents').load();
    },
    onAddSelected: function (btn) {
        var me = this, model = me.getViewModel(), grid = btn.up('window').down('grid'),
        selmodel = grid.getSelectionModel(), selections = selmodel.getSelection();
        console.log("Selected %o", selections);
        if ( selections.length == 0 ) {
            Ext.Msg.alert("No selection made","Please make a selection before attempting to add selected");
        } else {
            console.log("Adding selection to tree");
            me.fireEvent('addSelectedHistoryRecords',selections);
            btn.up('window').destroy();
        }
    }
});