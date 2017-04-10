/**
 * Created by Lee on 4/6/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promogrid.PromogridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promogrid',

    /**
     * Called when the view is created
     */
    init: function () {

    },
    listen: {
        controller: {
            '#vceventtreecontroller': {
                eventTreeSelection: 'onEventChange'
            }
        }
    },
    onEventChange: function (record) {
        var me = this;
        console.log("Event change " + record.data.nodetype);
        var nodetype = record.data.nodetype;
        if (nodetype == 'VEHICLE') {
            Ext.toast("Getting promos for vehicle " + record.data.id);
            var store = me.getStore("offers");
            console.log("Store %o", store);
            store.getProxy().extraParams = {
                vehicleID: record.data.id
            };
            store.load();
        }
    }

});