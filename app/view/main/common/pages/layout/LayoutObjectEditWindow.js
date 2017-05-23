/**
 * Created by Lee on 5/5/2017.
 */
Ext.define('Advertising.view.main.common.pages.layout.LayoutObjectEditWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Advertising.view.main.common.pages.layout.LayoutModel',
        'Advertising.view.main.common.pages.layout.LayoutObjectEditController',
        'Ext.button.Button',
        'Ext.layout.container.Form',
        'Ext.window.MessageBox'
    ],
    controller: 'layoutobjectedit',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        console.log("New window %o", me);
        console.log('Source object was %o', me.sourceObject);
        // add all items from source object - we have to return them afterwards
        me.sourceObject.addCls('f-layout-edit');
        me.setTitle('Editing layout object');
        me.sourceObject.items.each(function (item) {
            me.add(item);
        });

    },

    viewModel: {
        type: 'layout'
    },
    width: 400,
    height: 700,
    modal: true,
    config: {
        showAnimation: {
            type: 'fadeIn'
        },
        hideAnimation: {
            type: 'fadeOut'
        }
    },
    listeners: {
        close: function (win) {
            if (!win.sourceObject.destroyed) {
                win.items.each(function (item) {
                    //    if (items.xtype != 'button') {
                    //    }
                    if (item.hasOwnProperty('xtype') && item.xtype == 'button') {

                    } else {
                        win.sourceObject.add(item);
                    }
                });
                win.sourceObject.removeCls('f-layout-edit');
            } else {
                console.log("Source object has been deleted..");
            }
        }

    },
    /*
     Uncomment to give this component an xtype
     xtype: 'layoutobjecteditwindow',
     */

    layout: 'form',
    items: [
        {
            xtype: 'button',
            text: 'Delete',
            handler: function (btn) {
                var box = Ext.create('Ext.window.MessageBox');
                var me = this;
                box.confirm('Delete', 'Are you sure you want to delete this item?', function (answer) {
                    if (answer == 'yes') {
                        var source = btn.up('window').sourceObject;
                        console.log("Deleting %o", source);
                        source.destroy();
                    }
                    btn.up('window').close();
                });
            }
        }

        //{
        //    xtype: 'numberfield',
        //    labelAlign: 'top',
        //    name: 'width',
        //    fieldLabel: 'Width'
        //},
        //{
        //    xtype: 'numberfield',
        //    labelAlign: 'top',
        //    name: 'height',
        //    fieldLabel: 'Height'
        //}

    ],
    buttons: [

        {
            text: 'OK',
            handler: function () {
                this.up('window').close();

            }
        }
    ]
})
;