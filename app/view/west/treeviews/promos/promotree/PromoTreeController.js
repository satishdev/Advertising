/**
 * Created by Lee on 3/22/2017.
 */
Ext.define('Advertising.view.west.treeviews.promos.promotree.PromoTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promotree',

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
    onEventChange: function(record) {
        var me =this;

        var nodetype = record.data.nodetype;
        if ( nodetype == 'VEHICLE') {
            Ext.toast("Getting promos for vehicle " + record.data.id);

        }
    }

});