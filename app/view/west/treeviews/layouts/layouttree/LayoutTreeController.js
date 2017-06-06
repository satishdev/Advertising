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
    onLayoutTreeExpand: function(node, eOpts) {
        console.log("Expanding tree node %o", node);
    },
    onNodeTreeDrop: function (node, data, overModel, dropPosition, eOpts) {
        Ext.toast("Moving node - notify back-end");
        console.log("Move node 1: %o 2: %o 3: %o 4: %o", node, data, overModel, dropPosition);
        Ext.Ajax.request({
            url: Advertising.util.GlobalValues.serviceURL + "/tree/moveLayoutNode",
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,
            params: {
                node: Ext.JSON.encode(node)
            },
            success: function (transport) {

            }
        });
    },
    onShowLayoutTreeMenu: function (tree, record, item, index, e, eOpts) {
        var me = this;
        var menu = undefined;
        e.stopEvent();
        console.log("Showing menu for item %o", record);

        // only show context menu for vehicles and pages
        if (record.data.nodetype == 'LAYOUTFOLDER') {
            menu = Ext.create('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenu',
                {
                    data: record.data,
                    items: [
                        {
                            text: 'Delete Folder',
                            iconCls: 'fa fa-trash',
                            handler: function () {
                                var box = Ext.create('Ext.window.MessageBox');
                                box.confirm('Confirm delete', 'Are you sure you want to remove folder <b style="color:red">' + record.data.text  +'</b>?', function (btn) {
                                    if (btn === 'yes') {
                                        Ext.toast("Removing folder " + record.data.id);
                                        me.deleteLayoutFolder(record);
                                    }
                                });
                            }

                        },
                        {
                            text: 'Add Folder',

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
                                                    var child = parentNode.insertChild(record.data.id, {
                                                        id: response.id,
                                                        text: response.text,
                                                        leaf: false

                                                    });
                                                    child.data = record.data;
                                                    console.log("Added node to tree %o", parentNode);

                                                },
                                                failure: function (transport) {
                                                    try {
                                                        var response = Ext.decode(transport.responseText);

                                                        Ext.Msg.alert('Error', response.message);
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

                            iconCls: 'fa fa-th',
                            handler: function () {
                                var layoutWin = Ext.create('Advertising.view.main.layouts.layoutcreator.LayoutCreator', {
                                    sourceData: record.data
                                }).show();
                            }
                        }

                    ]

                });

        }


        if (record.data.nodetype == 'LAYOUT') {

            menu = Ext.create('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenu',
                {
                    items: [
                        {
                            text: 'Rename Layout',
                            iconCls: 'fa fa-edit',
                            handler: function () {
                                var box = Ext.create('Ext.window.MessageBox');


                                box.prompt('Rename', 'Enter new name:', function (btn, text) {


                                });
                                console.log("Box %o", box);
                                box.down('textfield').setValue(record.data.text);

                            }

                        },
                        {
                            text: 'Delete Layout',
                            iconCls: 'fa fa-trash',
                            handler: function () {
                                var box = Ext.create('Ext.window.MessageBox');
                                box.confirm('Confirm delete', 'Are you sure you want to remove layout <b style="color:red">' + record.data.text  +'</b>?', function (btn) {
                                    if (btn === 'yes') {
                                        console.log("Removing layout %o", record.data );
                                        Ext.toast("Removing layout " + record.data.id);
                                        me.deleteLayout(record);
                                    }
                                });
                            }
                        }

                    ]
                });
        }
        if ( menu) {
            menu.showAt(e.getXY());
        }

    },
    updateLayoutName: function (newName) {

    }    ,
    deleteLayoutFolder: function(record) {
        var me = this;
        console.log("Deleting layout %o",record.data);
        var tree = me.getView();
        Ext.Ajax.request({
            url: Advertising.util.GlobalValues.serviceURL + "/layout/deleteLayoutFolder",
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,
            params: {
                // send all the model data as a JSON object
                layoutFolderID: record.data.id,
                recurse: false
            },
            success: function (transport) {
                var response = Ext.decode(transport.responseText);
                console.log("Removing tree node %o", tree);
                record.parentNode.removeChild(record);
            },
            failure: function (message) {
                Ext.msg.alert('Error ' + message);
            }
        });
    },
    deleteLayout: function(record) {
        var me = this;
        console.log("Deleting layout %o",record.data);
        var tree = me.getView();
        Ext.Ajax.request({
            url: Advertising.util.GlobalValues.serviceURL + "/layout/deleteLayout",
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            timeout: 1450000,
            params: {
                // send all the model data as a JSON object
                layoutID: record.data.id

            },
            success: function (transport) {
                var response = Ext.decode(transport.responseText);
                console.log("Removing tree node %o", tree);
                record.parentNode.removeChild(record);
            },
            failure: function (message) {
                Ext.msg.alert('Error ' + message);
            }
        });
    },
    onTreeNodeSelect: function (tree, record, ndx, opts) {
        // see if this is a layout or just a folder
        if (record.data.hasOwnProperty('nodetype') && record.get('nodetype') == 'LAYOUT') {
            this.fireEvent('layoutTreeSelection', record);
        }
    }
})
;