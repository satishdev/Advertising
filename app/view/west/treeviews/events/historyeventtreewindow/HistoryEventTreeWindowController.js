/**
 * Created by leejw_000 on 2017-06-30.
 */
Ext.define('Advertising.view.west.treeviews.events.historyeventtreewindow.HistoryEventTreeWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.historyeventtreewindow',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    onRenderWindow: function(win){
        var me = this;
        console.log("History win %o", win);
        console.log("Loading history store...");
        me.getViewModel().getStore('historyEvents').getProxy().extraParams ={
            fromDate: win.fromDate.toJSON(),
            toDate: win.toDate.toJSON()
        };
        me.getViewModel().getStore('historyEvents').load();
    }
});