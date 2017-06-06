/**
 * Created by Lee on 4/25/2017.
 */
Ext.define('Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenu', {
    extend: 'Ext.menu.Menu',

    xtype: 'layouttreemenu',

    requires: [
        'Advertising.view.main.layouts.layoutcreator.LayoutCreator',
        'Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeMenuController',
        'Advertising.view.west.treeviews.layouts.layouttree.LayoutTreeModel',
        'Ext.window.MessageBox'
    ],
    viewModel: {
        type: 'layouttree'
    },
    controller: 'layouttreemenu',
    initComponent: function () {
        console.log("--> Menu added %o", this);
        var me = this;
        this.callParent(arguments);

    },
    items: [
        {
            text: 'Delete Folder',

            iconCls: 'fa fa-trash',
            handler: function(menu, item ) {
                var me = this;
                var box = Ext.create('Ext.window.MessageBox');
                console.log("Remove item %o %o" , menu, item);
                box.confirm('Confirm delete', 'Are you sure you want to remove ' + this.getViewModel().get("data") +'?', function (btn) {
                    if (btn === 'yes') {
                        Ext.toast("Removing folder " + menu.getViewModel().get("data"));
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
                                    var child = parentNode.insertChild(record.data.id,{
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
            iconCls: 'fa fa-th',
            handler: function () {
                var layoutWin = Ext.create('Advertising.view.main.layouts.layoutcreator.LayoutCreator', {
                    sourceData: this.getViewModel().get('record')
                }).show();
            }
        }

    ]
});