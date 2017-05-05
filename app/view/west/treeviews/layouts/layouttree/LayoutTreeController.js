/**
 * Created by Lee on 4/5/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layouttree',

    requires: [
        'Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenu',
        'Ext.window.MessageBox'
    ],

    id: 'vclayouttreecontroller',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onShowLayoutTreeMenu: function (tree, record, item, index, e, eOpts) {
        e.stopEvent();
        console.log("Showing menu for item %o", record);
        // only show context menu for vehicles and pages
        if (record.data.nodetype == 'LAYOUTFOLDER') {
            if (!this.lmenu) {
                this.lmenu = Ext.create('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenu',
                    {
                        items: [
                            {
                                text: 'Add Folder',
                                vehicleName: record.data.Name,
                                vehicleID: record.data.id,
                                iconCls: 'fa fa-folder',
                                handler: function() {
                                    Ext.Msg.show({
                                                 title: 'Address',
                                            message: 'Please enter your address:',
                                             width: 300,
                                             buttons: Ext.Msg.OKCANCEL,
                                             multiline: true,
                                           //  fn: saveAddress,
                                         //    animateTarget: 'addAddressBtn',
                                             icon: Ext.window.MessageBox.INFO
                                         });
                }
                            },
                            {
                                text: 'Add Layout',
                                vehicleName: record.data.Name,
                                vehicleID: record.data.id,
                                iconCls: 'fa fa-th'
                            }

                        ],
                        data: record.data
                    });

            } else {
                this.lmenu.items.items[0].vehicleID = record.data.id
            }
            this.lmenu.showAt(e.getXY());
        }
    },
    onTreeNodeSelect: function (tree, record, ndx, opts) {
        // see if this is a layout or just a folder
        if (record.data.hasOwnProperty('nodetype') && record.get('nodetype') == 'LAYOUT') {
            this.fireEvent('layoutTreeSelection', record);
        }
    }
});