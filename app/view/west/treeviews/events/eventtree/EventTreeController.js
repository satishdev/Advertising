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
        if ( record.data.nodetype == 'VEHICLE' || record.data.nodetype == 'PAGE') {
          //  if (!this.menu) {
                this.menu = Ext.create('Advertising.view.west.treeviews.events.eventtree.EventTreeMenu',
                    {
                        items: [
                            {
                                text: record.data.Name,
                                iconCls: 'fa fa-page'
                            }
                        ],
                        data: record.data
                    });

       //     }
            this.menu.showAt(e.getXY());
        }
    }
});