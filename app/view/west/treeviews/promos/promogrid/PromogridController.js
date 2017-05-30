/**
 * Created by Lee on 4/6/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promogrid.PromogridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promogrid',
    id: 'vcpromogridcontroller',
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
    onOfferGridRowClick: function(grid, record, element, rowIndex, e, eOpts) {
      Ext.toast("Row clicked " + record.data.id);
        var me = this;
        me.fireEvent('highlightPromoOffers', record.data.id);
    },
    onPromoOfferItemClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.toast("Click " + rec.id);
    },
    onEventChange: function (node) {
        var me = this;
        console.log("Event change " + node.data.nodetype);
        var nodetype = node.data.nodetype;
        var store = me.getStore("offers");

        if (nodetype == 'VEHICLE') {
            Ext.toast("Getting promos for vehicle " + node.data.id);
            console.log("Store %o", store);
            store.getProxy().extraParams = {
                containerID: node.data.id,
                parentID: -1,
                vehicle: true
            };
            store.load();
        } else if ( nodetype == 'PAGE') {
            Ext.toast("Getting promos for page " + node.data.id);
            var parent =
            console.log("Store %o", store);
            store.getProxy().extraParams = {
                containerID: node.data.id,
                parentID: node.parentNode.data.id,
                vehicle: false
            };
            store.load();
        } else {
            store.loadData([], false);
        }
    }

});