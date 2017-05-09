/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.main.copy.copygrid.CopyGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.copygrid',

    /**
     * Called when the view is created
     */
    init: function() {

    },
    listen: {
        controller: {
            '#vceventtreecontroller': {
                eventTreeSelection: 'onEventChange'
            }
        }
    },
    onRowChange: function(r,cellEdit,evt) {
        var me = this;
        Ext.toast("Row changed");
        console.log("Row edit: %o %o %o", r,cellEdit,evt);
        console.log("Cell edit from %s to %s", cellEdit.originalValue,cellEdit.value);
        var grid = me.getView();

        console.log("grid %o",grid);

    },
    onEventChange: function(record) {
        var me = this;
        if ( record.data.nodeType == 'VEHICLE' || record.data.nodeType == 'PAGE') {
            console.log("Event was changed - getting copy %o", record);
            Ext.toast("Getting " + record.data.nodetype + " copy for " + record.data.id);
            var grid = me.getView();
            console.log("Grid %o", grid);

            var store = me.getViewModel().getStore("eventcopy");
            store.getProxy().extraParams = {
                objectID: record.data.id,
                eventType: record.data.nodetype
            };
            console.log("Loading copy grid store %o", store);
            store.load();
        }
    }
});