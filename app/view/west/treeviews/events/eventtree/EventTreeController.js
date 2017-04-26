/**
 * Created by Lee on 3/9/2017.
 */
Ext.define('Advertising.view.west.treeviews.events.eventtree.EventTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventtree',

    requires: [
        'Advertising.view.west.treeviews.events.eventtree.EventTreeMenu'
    ],

    onRenderContextMenu: function (menu) {
        var me = this;
        var model = me.getViewModel();
        console.log("Rendering context menu %o %o", menu, model);
    },
    id: 'vceventtreecontroller',
    /**
     * Called when the view is created
     */
    init: function () {

    },
    onTreeNodeSelect: function (tree, record, ndx, opts) {
        Ext.toast("Node clicked " + record.data);
        this.fireEvent('eventTreeSelection', record);
    },
    onShowEventTreeMenu: function (tree, record, item, index, e, eOpts) {
        e.stopEvent();
        console.log("Showing menu for item %o", record);
        // only show context menu for vehicles and pages
        if (record.data.nodetype == 'VEHICLE') {
            if (!this.vmenu) {
                this.vmenu = Ext.create('Advertising.view.west.treeviews.events.eventtree.EventTreeMenu',
                    {
                        items: [
                            {
                                text: 'Show space allocation',
                                vehicleName: record.data.Name,
                                vehicleID: record.data.id,
                                iconCls: 'fa fa-th'
                            }
                        ],
                        data: record.data
                    });

            } else {
                this.vmenu.items.items[0].vehicleID = record.data.id
            }
            this.vmenu.showAt(e.getXY());
        }
        if (record.data.nodetype == 'PAGE') {
            if (!this.pmenu) {
                this.pmenu = Ext.create('Advertising.view.west.treeviews.events.eventtree.EventTreeMenu',
                    {
                        items: [
                            {
                                text: 'Show space allocation',
                                pageName: record.data.Name,
                                pageID: record.data.id,
                                iconCls: 'fa fa-th'
                            }
                        ],
                        data: record.data
                    });

            } else {
                console.log("Menu %o", this.pmenu);
                this.pmenu.items.items[0].pageID = record.data.id
            }
            this.pmenu.showAt(e.getXY());
        }
    }
});