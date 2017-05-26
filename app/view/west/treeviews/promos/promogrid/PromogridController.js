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
    onPromoOfferItemClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.toast("Click " + rec.id);
    },
    onEventChange: function (record) {
        var me = this;
        console.log("Event change " + record.data.nodetype);
        var nodetype = record.data.nodetype;
        var store = me.getStore("offers");

        if (nodetype == 'VEHICLE') {
            Ext.toast("Getting promos for vehicle " + record.data.id);
            console.log("Store %o", store);
            store.getProxy().extraParams = {
                containerID: record.data.id,
                vehicle: true
            };
            store.load();
        } else if ( nodetype == 'PAGE') {
            Ext.toast("Getting promos for page " + record.data.id);
            console.log("Store %o", store);
            store.getProxy().extraParams = {
                containerID: record.data.id,
                vehicle: false
            };
            store.load();
        } else {
            store.loadData([], false);
        }
    }

});