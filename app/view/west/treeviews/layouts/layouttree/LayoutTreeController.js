/**
 * Created by Lee on 4/5/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layouttree',

    requires: [
        'Advertising.view.main.layouts.layoutcreator.LayoutCreator',
        'Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenu',
        'Ext.window.MessageBox'
    ],

    id: 'vclayouttreecontroller',

    /**
     * Called when the view is created
     */
    init: function () {

    },
    onNodeTreeDrop: function (node, data, overModel, dropPosition, eOpts) {
        Ext.toast("Moving node - notify back-end");
    },
    onShowLayoutTreeMenu: function (tree, record, item, index, e, eOpts) {
        var me = this;
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
                                handler: function () {
                                    var box = Ext.create('Ext.window.MessageBox');
                                    box.prompt('Add Folder', 'Folder name:', function (btn, text) {
                                        if (btn == 'ok') {
                                            if (!Ext.isEmpty(text)) {
                                                console.log("Adding folder to %o", record);

                                                Ext.Ajax.request({
                                                    url: Advertising.util.GlobalValues.serviceURL + "/tree/addLayoutFolder",
                                                    method: 'GET',
                                                    cors: true,
                                                    useDefaultXhrHeader: false,
                                                    timeout: 1450000,
                                                    params: {
                                                        folderName: text,
                                                        parentNode: record.data.id
                                                    },
                                                    success: function (transport) {
                                                        var response = Ext.decode(transport.responseText);
                                                        console.log("Got response %o", response);

                                                        var parentNode = tree.getStore().getNodeById(record.data.id);

                                                        //  parentNode.setLeaf(false);
                                                        parentNode.appendChild({
                                                            id: response.id,
                                                            text: response.text,
                                                            leaf: false

                                                        });

                                                    },
                                                    failure: function (transport) {
                                                        try {
                                                            var response = Ext.decode(transport.responseText);

                                                            Ext.Msg.alert('Error', response.Error);
                                                        } catch (err) {
                                                            Ext.Msg.alert('Error', err);

                                                        }

                                                    }
                                                });
                                            }

                                        }
                                    });
                                }
                            },
                            {
                                text: 'Add Layout',
                                vehicleName: record.data.Name,
                                vehicleID: record.data.id,
                                iconCls: 'fa fa-th',
                                handler: function () {
                                    var layoutWin = Ext.create('Advertising.view.main.layouts.layoutcreator.LayoutCreator', {
                                        sourceData: record.data
                                    }).show();
                                }
                            }

                        ],
                        data: record.data
                    });

            } else {
                this.lmenu.items.items[0].vehicleID = record.data.id
            }
            this.lmenu.showAt(e.getXY());
        }
        if (record.data.nodetype == 'LAYOUT') {
            if (!this.lomenu) {
                this.lomenu = Ext.create('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenu',
                    {
                        items: [
                            {
                                text: 'Rename Layout',
                                layoutName: record.data.Name,
                                layoutID: record.data.id,
                                iconCls: 'fa fa-edit'
                            },
                            {
                                text: 'Delete Layout',
                                layoutName: record.data.Name,
                                layoutID: record.data.id,
                                iconCls: 'fa fa-trash'
                            }

                        ]
                    });
            }
            this.lomenu.showAt(e.getXY());

        }
    },
    onTreeNodeSelect: function (tree, record, ndx, opts) {
        // see if this is a layout or just a folder
        if (record.data.hasOwnProperty('nodetype') && record.get('nodetype') == 'LAYOUT') {
            this.fireEvent('layoutTreeSelection', record);
        }
    }
});